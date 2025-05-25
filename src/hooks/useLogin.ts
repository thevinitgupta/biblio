import { loggingService } from "@/app/actions/logging";

import { LoginResponseType } from "@/types/authentication";
import { ResponseType, LoggerLevel } from "@/types/enums";

import { LoginFormData, LoginFormSchema } from "@/types/forms";
import { authClient } from "@/utils/axiosUtil";

import { parseError } from "@/utils/errorParser";
import useGlobalStore from "@/utils/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { setSession } = useGlobalStore();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: any) => {
      try {
        const publicKey = useGlobalStore.getState().publicKey;
        console.log("PUBLIC KEY AT LOGIN : ", publicKey);
      } catch (err) {
        console.log("Error at LOGIN FOR PUBLIC KEY : ", err);
      }
      const loginCredentials = values as LoginFormData;
      const { email, password } = LoginFormSchema.parse({
        email: loginCredentials.email,
        password: loginCredentials.password,
      });

      const loginResponse: AxiosResponse = await authClient.post(
        "/login",
        loginCredentials
      );

      const loginResponseData = loginResponse.data;

      const token: string = loginResponseData.accessToken || "";
      console.log("Token Login : " + token);
      queryClient.setQueryData(["access-token"], () => token);
      setSession(token);
      return { message: `Login Successful`, token, type: ResponseType.success };
    },
  });
};

export default useLogin;
