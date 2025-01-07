import { loggingService } from "@/app/actions/logging";
;
import { ResponseType, LoggerLevel } from "@/types/enums";

import { CreatePostData, CreatePostSchema, LoginFormData, LoginFormSchema, SignupFormData, SignupFormSchema, UploadProfileImageData, UploadProfileImageSchema } from "@/types/forms";
import { authClient, axios, privateAccessClient } from "@/utils/axiosUtil";

import useGlobalStore from "@/utils/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {AxiosResponse} from 'axios';


// Get the CSRF token from the cookie (default name might be "XSRF-TOKEN")


const useUploadProfileImage = () => {
    const queryClient = useQueryClient();
    const {sessionToken} = useGlobalStore();
    return useMutation({
        mutationKey: ["upload-profile-image"],
        mutationFn: async (values: any) => {
            
            const token = sessionToken || queryClient.getQueryData(['access-token']);
            // console.log("TOKEN CREATE POST :", token)

        const uploadProfileImageData = values as UploadProfileImageData;
        
        // Ensure `file` exists
        if (!uploadProfileImageData.file || !uploadProfileImageData.file[0]) {
            return {message : "No file selected for upload.", type : ResponseType.error};
        }

        // Create FormData and append the file
        const formData = new FormData();
        formData.append("file", uploadProfileImageData.file[0]);

        UploadProfileImageSchema.parse({
            file: uploadProfileImageData.file[0],
        });
        const headers = {
            "Authorization": `Basic ${token?.trim()}`, 
            "Content-Type": "multipart/form-data",
        }

        console.log("Upload Prof Image headers : ",headers);
        const uploadProfileImageResponse : AxiosResponse = await privateAccessClient.post('/user/profileImage',formData, {
            headers : headers    
        });
            console.log("Upload Prof Image Response : ",uploadProfileImageResponse)
        const uploadProfileImageResponseData = uploadProfileImageResponse.data;
        

        const createPostResponseMessage : string = uploadProfileImageResponseData as string || '';
        
        queryClient.invalidateQueries({
            queryKey : ["profile-image"],
            refetchType : "all",
            
        })
        return {message : createPostResponseMessage, type : ResponseType.success};

        },
    })
}

export default useUploadProfileImage;