import { loggingService } from "@/app/actions/logging";

import { LoginResponseType } from "@/types/authentication";
import { ResponseType, LoggerLevel } from "@/types/enums";

import { CreatePostData, CreatePostSchema, LoginFormData, LoginFormSchema, SignupFormData, SignupFormSchema } from "@/types/forms";
import { authClient } from "@/utils/axiosUtil";

import { parseError } from "@/utils/errorParser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {AxiosResponse} from 'axios';


const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-post"],
        mutationFn: async (values: any) => {
            const token = queryClient.getQueryData(['access-token']);
            console.log("TOKEN CREATE POST :", token)
        const createPostData = values as CreatePostData;
        console.log("Create Post Data : ",createPostData);
        CreatePostSchema.parse({
            title: createPostData.title,
            content: createPostData.content,
        });

        const createPostResponse : AxiosResponse = await authClient.post('/posts/create',createPostData, {
            headers : {
                "Authorization": `Basic ${token ? token : ""}`,
                "getSetCookie": "refreshToken"
            }
        });
            console.log("Create Post Response : ",createPostResponse)
        const createPostResponseData = createPostResponse.data;
        

        const createPostResponseMessage : string =createPostResponseData as string || '';
        
        return {message : createPostResponseMessage, type : ResponseType.success};

        },
    })
}

export default useCreatePost;