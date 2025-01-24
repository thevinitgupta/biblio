import { loggingService } from "@/app/actions/logging";
;
import { ResponseType, LoggerLevel } from "@/types/enums";

import { CreatePostData, CreatePostSchema, LoginFormData, LoginFormSchema, SignupFormData, SignupFormSchema } from "@/types/forms";
import { authClient, axios, privateAccessClient } from "@/utils/axiosUtil";

import useGlobalStore from "@/utils/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {AxiosResponse} from 'axios';

function getCookieValue(cookieName : string) {
    const name = cookieName + "=";
    console.log("Document for Cookie :"+document, document?.cookie)
    const decodedCookie = decodeURIComponent(document?.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

// Get the CSRF token from the cookie (default name might be "XSRF-TOKEN")


const useCreatePost = () => {
    const queryClient = useQueryClient();
    const {sessionToken} = useGlobalStore();
    return useMutation({
        mutationKey: ["create-post"],
        mutationFn: async (values: any) => {
            
            const token = sessionToken || queryClient.getQueryData(['access-token']);
            // console.log("TOKEN CREATE POST :", token)
            
            const createPostData = values as CreatePostData;

            
            
            //console.log("Create Post Data : ",createPostData);

            CreatePostSchema.parse({
                title: createPostData.title,
                content: createPostData.content,
                taggedBook: createPostData.taggedBook
            });

            createPostData.taggedBook.bookId = createPostData.taggedBook.id!;
            createPostData.taggedBook.id = null;

            const headers = {
                "Authorization": `Basic ${token?.trim()}`,    
            }

            console.log("Create Post headers : ",headers);
            const createPostResponse : AxiosResponse = await privateAccessClient.post('/posts/create',createPostData, {
                headers : headers    
            });
                console.log("Create Post Response : ",createPostResponse)
            const createPostResponseData = createPostResponse.data;
            

            const createPostResponseMessage : string =createPostResponseData as string || '';
            
            return {message : createPostResponseMessage, type : ResponseType.success};

        },
    })
}

export default useCreatePost;