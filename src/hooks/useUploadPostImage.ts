import { loggingService } from "@/app/actions/logging";
;
import { ResponseType, LoggerLevel } from "@/types/enums";

import { CreatePostData, CreatePostSchema, LoginFormData, LoginFormSchema, SignupFormData, SignupFormSchema, UploadPostImageData, UploadPostImageSchema, UploadProfileImageData, UploadProfileImageSchema } from "@/types/forms";
import { authClient, axios, privateAccessClient } from "@/utils/axiosUtil";

import useGlobalStore from "@/utils/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {AxiosResponse} from 'axios';


// Get the CSRF token from the cookie (default name might be "XSRF-TOKEN")

export interface PostImageUploadResponse {
    postImage : string | null;
    message : string
}

const useUploadPostImage = () => {
    const queryClient = useQueryClient();
    const {sessionToken} = useGlobalStore();
    return useMutation({
        mutationKey: ["upload-post-image"],
        mutationFn: async (values: any) => {
            
            const token = sessionToken || queryClient.getQueryData(['access-token']);
            // console.log("TOKEN CREATE POST :", token)

        const uploadPostImageData = values as UploadPostImageData;
        
        // Ensure `file` exists
        if (!uploadPostImageData.file || !uploadPostImageData.file[0]) {
            return {message : "No file selected for upload.", type : ResponseType.error};
        }

        // Create FormData and append the file
        const formData = new FormData();
        formData.append("file", uploadPostImageData.file[0]);

        UploadPostImageSchema.parse({
            file: uploadPostImageData.file[0],
        });
        const headers = {
            "Authorization": `Basic ${token?.trim()}`, 
            "Content-Type": "multipart/form-data",
        }

        console.log("Upload Prof Image headers : ",headers);
        const uploadPostImageResponse : AxiosResponse = await privateAccessClient.post('/posts/image',formData, {
            headers : headers    
        });
            console.log("Upload Prof Image Response : ",uploadPostImageResponse)
        const uploadProfileImageResponseData = uploadPostImageResponse.data;
        

        const createPostResponseData : PostImageUploadResponse = uploadProfileImageResponseData as PostImageUploadResponse || '';
        
        
        return {data : createPostResponseData.postImage, 
            message : createPostResponseData.message, 
            type : ResponseType.success};

        },
    })
}

export default useUploadPostImage;