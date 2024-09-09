import { loggingService } from "@/app/actions/logging";
import { loginUser } from "@/app/actions/loginUser";
import { LoginResponseType } from "@/types/authentication";
import { ImageDataResponseType, ProfileDataResponseType, ServerResponseType } from "@/types/common";
import { ResponseType, LoggerLevel } from "@/types/enums";
import { applicationErrors } from "@/types/errors";
import { LoginFormData, LoginFormSchema } from "@/types/forms";
import { Post } from "@/types/post";
import { UserI } from "@/types/user";
import { checkError } from "@/utils/errorChecker";
import { parseError } from "@/utils/errorParser";
import checkServerResponse from "@/utils/serverResponseChecker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";


const useFetchImage = () => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ["image"],
        queryFn: async () : Promise<ImageDataResponseType>=> {
        const token = queryClient.getQueryData(['access-token']);
        
        const fetchUserResponse = await fetch("http://localhost:8080/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accepts" : "text/plain",
                "Authorization": `Basic ${token ? token : ""}`,
                "getSetCookie": "refresh-token"
            },
            
            credentials : "include"

        });
        // console.log("Image RESPONSE : ", fetchUserResponse)

        // Handle Error Server responses
        if(!fetchUserResponse.ok) return await checkServerResponse(fetchUserResponse, {token : null, data : null}) as ImageDataResponseType;

        const fetchUserResponseData  = await fetchUserResponse.json() as string;
        // console.log("Image RESPONSE DATA : ", fetchUserResponseData)

        return {message : `Success Image`, data : fetchUserResponseData , type : ResponseType.success};

        },

        retry : false,
        retryDelay : 60,
        refetchOnWindowFocus : false,
        throwOnError : true,
        
        
    })
}

export default useFetchImage;