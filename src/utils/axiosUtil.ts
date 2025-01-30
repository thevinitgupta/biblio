import axios,{ AxiosError, AxiosRequestHeaders } from 'axios'
import { parseServerError } from './errorParser';
import { useRouter } from 'next/router';
import { ErrorResponse } from '@/types/errors';
import useGlobalStore from './zustand';

let isRefreshing = false;
let refreshSubscribers : Array<CallableFunction> = [];

function getCsrfTokenFromCookie() {
    const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    if (match) {
        return match[2];
    }
    return null;
}

const subscribeToRefresh = (callback : CallableFunction) => {
    refreshSubscribers.push(callback);
}

const onAccessTokenRefreshed = (accessToken : string) => {
    refreshSubscribers.forEach((callback) => { callback(accessToken)});
}



// Set Axios with CSRF token and include cookies globally
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
    const csrfToken = getCsrfTokenFromCookie();
    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return config;
}, (error) => {

    return Promise.reject(error);
});


const authClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
    headers: {
        "Content-Type": "application/json",
        "Accepts" : "application/json",
    },
});

const publicClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
        "Content-Type": "application/json",
        
    },
});


const privateAccessClient = axios.create({
    baseURL : `${process.env.NEXT_PUBLIC_API_URL}/`,
    headers : {
        "getSetCookie": "refreshToken",
        // "Content-Type": "application/json",
        "Accepts" : "application/json",
    },
    withCredentials: true 
})

privateAccessClient.interceptors.response.use((response) => response,
async (error : AxiosError) => {
    
    console.log("Error Caught in Interceptor!!")
    const originalRequest = {...error.config , _retry : false};
    const errorResponse : ErrorResponse = error.response?.data as ErrorResponse;
    if(error.response?.status===401 
        && errorResponse.error.includes("WWW-Authenticate : Bearer")
        && !originalRequest._retry) {
            console.log("Trying to refresh!!")
            originalRequest._retry = true;

            if(isRefreshing){
                return new Promise((resolve) => {
                    subscribeToRefresh((newToken : string) => {
                        originalRequest.headers = originalRequest.headers ?? {} as AxiosRequestHeaders;
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                        resolve(axios(originalRequest));
                    })
                })
            }

            isRefreshing = true;

            try {
                // const {setSession} = useGlobalStore();
                const { setSession } = useGlobalStore.getState();
                const accessTokenRefreshResponse = await privateAccessClient.post("/auth/access-token");
                const {accessToken} = accessTokenRefreshResponse.data;

                if(!accessToken) {
                    throw new Error("Access token is empty");
                }
                setSession(accessToken);
                onAccessTokenRefreshed(accessToken);

                originalRequest.headers = originalRequest.headers ?? {} as AxiosRequestHeaders;
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                return axios(originalRequest);
            } catch (refreshError) {
                console.log("Access Token Refresh Failed : ",refreshError)
                return Promise.reject(refreshError);
            }
            finally{
                isRefreshing = false;
            }

        }
    return Promise.reject(error);
})



export {authClient,privateAccessClient,publicClient, axios};