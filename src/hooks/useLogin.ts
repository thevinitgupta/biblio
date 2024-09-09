import { loggingService } from "@/app/actions/logging";
import { loginUser } from "@/app/actions/loginUser";
import { LoginResponseType } from "@/types/authentication";
import { ResponseType, LoggerLevel } from "@/types/enums";
import { applicationErrors } from "@/types/errors";
import { LoginFormData, LoginFormSchema } from "@/types/forms";
import { checkError } from "@/utils/errorChecker";
import { parseError } from "@/utils/errorParser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";


const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (values: any) => {
            const loginCredentials = values as LoginFormData;
            console.log(loginCredentials);
            const { email, password } = LoginFormSchema.parse({
                email: loginCredentials.email,
                password: loginCredentials.password
            });

        const loginResponse = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts" : "text/plain",
                
            },
            credentials :"include",
            body : JSON.stringify({
                email,
                password
            })

        });
        console.log("LOGIN RESPONSE : ", loginResponse)
        // const loginResponseHeaders  = loginResponse;
        // console.log("LOGIN Headers : ",loginResponseHeaders)
        const loginResponseData = await loginResponse.json();
        console.log("LOGIN RESPONSE DATA : ", loginResponseData)

        if(loginResponse.status===404) {
            loggingService(`Error logging in user : ${email}`, LoggerLevel.warn);
            return {message : loginResponseData.message || `Check Email`, token : null, type : ResponseType.warning};
        }
        else if(loginResponse.status===401) {
            loggingService(`Wrong Password for user : ${email}`, LoggerLevel.warn);
            return {message : loginResponseData.message || `Wrong Password`, token : null, type : ResponseType.warning};
        }
        else if(loginResponse.status===403) {
            loggingService(`Unauthorized Access by user : ${email}`, LoggerLevel.warn);
            return {message : loginResponseData.message || `Not Authorized to access`, token : null, type : ResponseType.warning};
        }
        else if(loginResponse.status>=300) {
            loggingService(`Error logging in user : ${email}`, LoggerLevel.warn);
            return {message : loginResponseData.message || `Something went wrong, please try again.`, token : null, type : ResponseType.error};
        }

        const token : string = loginResponseData.accessToken || '';
        console.log("Token Login : "+token)
        queryClient.setQueryData(
            ['access-token'],
            () => token
        ); 
        return {message : `Login Successful`, token, type : ResponseType.success};

        },

        
        onError: (error): LoginResponseType => {
            const errorResponse = parseError(error);
            
            if(errorResponse!==null) return {message : errorResponse.description, type : errorResponse.type};
            loggingService(`Unrecognised User trying to access`, LoggerLevel.warn);
            return { message: `${error instanceof Error && error.message.length > 0 ? error.message : "Invalid User Credentials"}`, type: ResponseType.error };
        },
    })
}

export default useLogin;