
;
import { ResponseType } from "@/types/enums";

import { CreateCommentData, CreateCommentSchema} from "@/types/forms";
import { privateAccessClient } from "@/utils/axiosUtil";

import useGlobalStore from "@/utils/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {AxiosResponse} from 'axios';



const useUpdateComment = () => {
    const queryClient = useQueryClient();
    const {sessionToken} = useGlobalStore();
    return useMutation({
        mutationKey: ["update-comment"],
        mutationFn: async ({commentId, updateCommentData}:{
            commentId : string,
            updateCommentData : CreateCommentData
        }) => {

            const token = sessionToken || queryClient.getQueryData(['access-token']);
            
            console.log("UPDATE COMMENT DATA : "+updateCommentData.content, updateCommentData.parentCommentId, updateCommentData.postId)
            
            
            
            //console.log("Create Post Data : ",createPostData);

            CreateCommentSchema.parse({
                content : updateCommentData.content,
                parentCommentId : updateCommentData.parentCommentId,
                postId : updateCommentData.postId,
            });
            

            const headers = {
                "Authorization": `Basic ${token?.trim()}`,    
            }

            console.log("Create Post headers : ",headers);
            const updateCommentResponse : AxiosResponse = await privateAccessClient.put(`/comment/${commentId}`,updateCommentData, {
                headers : headers    
            });
                console.log("Create Post Response : ",updateCommentResponse)
            const updateCommentResponseData = updateCommentResponse.data;
            

            queryClient.invalidateQueries({
                queryKey : ["comments-"+updateCommentData.postId]
            })

            const updateCommentResponseMessage : string =updateCommentResponseData as string || '';
            
            return {message : updateCommentResponseMessage, type : ResponseType.success};

        },
    })
}

export default useUpdateComment;