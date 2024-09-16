import { loggingService } from "@/app/actions/logging";
import { loginUser } from "@/app/actions/loginUser";
import { LoginResponseType } from "@/types/authentication";
import { ProfileDataResponseType, ServerResponseType } from "@/types/common";
import { ResponseType, LoggerLevel } from "@/types/enums";
import { applicationErrors } from "@/types/errors";
import { LoginFormData, LoginFormSchema } from "@/types/forms";
import { UserI } from "@/types/user";
import { checkError } from "@/utils/errorChecker";
import { parseError } from "@/utils/errorParser";
import checkServerResponse from "@/utils/serverResponseChecker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";


const useFetchUser = () => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () : Promise< ProfileDataResponseType>=> {
        const token = queryClient.getQueryData(['access-token']);  //"eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJCaWJsaW8iLCJzdWIiOiJBY2Nlc3MtVG9rZW4iLCJ1c2VybmFtZSI6InRoZXZpbml0Z3VwdGFhQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiY3JlYXRlOmNvbW1lbnQsY3JlYXRlOnBvc3QsZGVsZXRlOmNvbW1lbnQsZGVsZXRlOnBvc3QsZGVsZXRlOnVzZXIscmVhZDpjb21tZW50LHJlYWQ6cG9zdCxyZWFkOnVzZXIsdXBkYXRlOmNvbW1lbnQsdXBkYXRlOnBvc3QsdXBkYXRlOnVzZXIiLCJpYXQiOjE3MjU0MTM2ODMsImV4cCI6MTcyNTQxMzc0M30.GM17fv-S8VqUA2AWgdzrtY2syb1Y7FpSQWkLdLrMN-A";
        
        const fetchUserResponse = await fetch("http://localhost:8080/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accepts" : "text/plain",
                "Authorization": `Basic ${token ? token : ""}`,
                "getSetCookie": "refreshToken"
            },
            
            credentials : "include"

        });
        // console.log("User Details : ", fetchUserResponse)
        
        // Handle Error Server responses
        if(!fetchUserResponse.ok) return await checkServerResponse(fetchUserResponse, {token : null, data : null}) as ProfileDataResponseType;

        const fetchUserResponseData  = await fetchUserResponse.json() as UserI;

        return {message : `Success`, data : fetchUserResponseData , type : ResponseType.success};

        },

        retry : false,
        retryDelay : 60,
        refetchOnWindowFocus : false,
        throwOnError : true,
        
        
    })
}

export default useFetchUser;