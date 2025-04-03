import { loggingService } from "@/app/actions/logging";

import { LoginResponseType } from "@/types/authentication";
import { ResponseType, LoggerLevel } from "@/types/enums";

import { LoginFormData, LoginFormSchema, SignupFormData, SignupFormSchema } from "@/types/forms";
import { authClient } from "@/utils/axiosUtil";

import { parseError } from "@/utils/errorParser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {AxiosResponse} from 'axios';


const useSignup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["signup"],
        mutationFn: async (values: any) => {
            const signupCredentials = values as SignupFormData;
            console.log("Signup data : ",signupCredentials)
            const { email, password, firstName, lastName } = SignupFormSchema.parse({
                email: signupCredentials.email,
                password: signupCredentials.password,
                firstName : signupCredentials.firstName,
                lastName : signupCredentials.lastName
            });



        const signupResponse : AxiosResponse = await authClient.post('/register',signupCredentials);
            console.log("Register Response : ",signupResponse)
        const signupResponseData = signupResponse.data;
        

        const registrationMessage : string =signupResponseData.message || '';
        
        return {message : registrationMessage, type : ResponseType.success};

        },
    })
}

export default useSignup;