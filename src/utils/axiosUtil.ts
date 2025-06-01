import axios, {
  AxiosError,
  AxiosRequestHeaders,
  CreateAxiosDefaults,
} from "axios";
import { ErrorResponse } from "@/types/errors";
import useGlobalStore from "./zustand";
import { arrayBufferToBase64 } from "./requestEncryption";
import JSEncrypt from "jsencrypt";

let isRefreshing = false;
let refreshSubscribers: Array<CallableFunction> = [];

function getCsrfTokenFromCookie() {
  const match = document.cookie.match(new RegExp("(^| )XSRF-TOKEN=([^;]+)"));
  if (match) {
    return match[2];
  }
  return null;
}

const subscribeToRefresh = (callback: CallableFunction) => {
  refreshSubscribers.push(callback);
};

const onAccessTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach((callback) => {
    callback(accessToken);
  });
};

const encrypt = async (data: any, publicKey: CryptoKey) => {
  const encodedData = new TextEncoder().encode(JSON.stringify(data));
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encodedData
  );

  return arrayBufferToBase64(encryptedData);
};

const encryptRSA = (data: any, publicKey: string) => {
  let rsaEncrypt = new JSEncrypt();
  rsaEncrypt.setPublicKey(publicKey);
  const encrypted = rsaEncrypt.encrypt(JSON.stringify(data));
  return encrypted;
};

// Set Axios with CSRF token and include cookies globally
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    const csrfToken = getCsrfTokenFromCookie();
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const createEncryptedAxiosInstance = (
  axiosConfig: CreateAxiosDefaults<any> | undefined
) => {
  const instance = axios.create(axiosConfig);

  instance.interceptors.request.use(async (config) => {
    try {
      const publicKey = useGlobalStore.getState().publicKey;
      const sanitizedPublicKey = publicKey.replace(/\s+/g, "");
      console.log("PUBLIC KEY AT Encryption : ", sanitizedPublicKey);
      if (publicKey && config.data) {
        // const binaryDer = Uint8Array.from(atob(sanitizedPublicKey), (char) => char.charCodeAt(0));

        // const cryptoKey = await window.crypto.subtle.importKey(
        //     'spki',
        //     binaryDer.buffer,
        //     {
        //         name: 'RSA-OAEP',
        //         hash: {name: "SHA-256"},
        //     },
        //     true,
        //     ['encrypt']
        // );
        const encrypted = await encryptRSA(config.data, sanitizedPublicKey);
        console.log("RSA enc data : " + encrypted);
        config.data = { encrypted };
      }
    } catch (err) {
      console.log("Error at INTERCEPTOR FOR PUBLIC KEY : ", err);
    }

    return config;
  });

  return instance;
};

const authClient = createEncryptedAxiosInstance({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
    Accepts: "application/json",
    "X-ENCRYPTED": "true",
  },
});

const publicClient = createEncryptedAxiosInstance({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    "X-ENCRYPTED": "false",
  },
});

const encryptionClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    "X-ENCRYPTED": "false",
  },
});

const privateAccessClient = createEncryptedAxiosInstance({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
  headers: {
    getSetCookie: "refreshToken",
    "Content-Type": "application/json",
    Accepts: "application/json",
    "X-ENCRYPTED": "true",
  },
  withCredentials: true,
});

const fileUploadClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
  headers: {
    getSetCookie: "refreshToken",
    Accepts: "application/json",
    "X-ENCRYPTED": "false",
  },
  withCredentials: true,
});

const openDataClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accepts: "application/json",
    "X-ENCRYPTED": "false",
  },
  withCredentials: true,
});

privateAccessClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.log("Error Caught in Interceptor!!");
    const originalRequest = { ...error.config, _retry: false };
    const errorResponse: ErrorResponse = error.response?.data as ErrorResponse;
    if (
      error.response?.status === 401 &&
      errorResponse.error.includes("WWW-Authenticate : Bearer") &&
      !originalRequest._retry
    ) {
      console.log("Trying to refresh!!");
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeToRefresh((newToken: string) => {
            originalRequest.headers =
              originalRequest.headers ?? ({} as AxiosRequestHeaders);
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(axios(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // const {setSession} = useGlobalStore();
        const { setSession } = useGlobalStore.getState();
        const accessTokenRefreshResponse = await privateAccessClient.post(
          "/auth/access-token"
        );
        const { accessToken } = accessTokenRefreshResponse.data;

        if (!accessToken) {
          throw new Error("Access token is empty");
        }
        setSession(accessToken);
        onAccessTokenRefreshed(accessToken);

        originalRequest.headers =
          originalRequest.headers ?? ({} as AxiosRequestHeaders);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        console.log("Access Token Refresh Failed : ", refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export {
  authClient,
  privateAccessClient,
  publicClient,
  openDataClient,
  encryptionClient,
  fileUploadClient,
  axios,
};
