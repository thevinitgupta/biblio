
;
import { ResponseType } from "@/types/enums";

import { CreateCommentData, CreateCommentSchema} from "@/types/forms";
import { privateAccessClient } from "@/utils/axiosUtil";

import useGlobalStore from "@/utils/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {AxiosResponse} from 'axios';



const useCreateComment = () => {
    const queryClient = useQueryClient();
    const {sessionToken} = useGlobalStore();
    return useMutation({
        mutationKey: ["create-comment"],
        mutationFn: async (values: any) => {

            const token = sessionToken || queryClient.getQueryData(['access-token']);
            
            console.log("CREATE COMMENT DATA : "+values.comment, values.parentId, values.postId)
            const createCommentData = values as CreateCommentData;

            
            
            //console.log("Create Post Data : ",createPostData);

            CreateCommentSchema.parse({
                content : createCommentData.content,
                parentCommentId : createCommentData.parentCommentId,
                postId : createCommentData.postId,
            });
            

            const headers = {
                "Authorization": `Basic ${token?.trim()}`,    
            }

            console.log("Create Post headers : ",headers);
            const createCommentResponse : AxiosResponse = await privateAccessClient.post('/comment',createCommentData, {
                headers : headers    
            });
                console.log("Create Post Response : ",createCommentResponse)
            const createCommentResponseData = createCommentResponse.data;
            

            queryClient.invalidateQueries({
                queryKey : ["comments-"+createCommentData.postId]
            })

            const createCommentResponseMessage : string =createCommentResponseData as string || '';
            
            return {message : createCommentResponseMessage, type : ResponseType.success};

        },
    })
}

export default useCreateComment;