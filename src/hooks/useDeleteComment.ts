
;
import { ResponseType } from "@/types/enums";

import { CreateCommentData, CreateCommentSchema} from "@/types/forms";
import { privateAccessClient } from "@/utils/axiosUtil";

import useGlobalStore from "@/utils/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {AxiosResponse} from 'axios';



const useDeleteComment = () => {
    const queryClient = useQueryClient();
    const {sessionToken} = useGlobalStore();
    return useMutation({
        mutationKey: ["delete-comment"],
        mutationFn: async (values : {commentId : string, postId : string}) => {

            const token = sessionToken || queryClient.getQueryData(['access-token']);
            const {commentId, postId} = values;
            console.log("DELETE COMMENT DATA : "+commentId)
            
            

            const headers = {
                "Authorization": `Basic ${token?.trim()}`,    
            }

            console.log("Create Post headers : ",headers);
            const deleteCommentResponse : AxiosResponse = await privateAccessClient.delete(`/comment/${commentId}`, {
                headers : headers    
            });
                console.log("Create Post Response : ",deleteCommentResponse)
            const deleteCommentResponseData = deleteCommentResponse.data;
            

            queryClient.invalidateQueries({
                queryKey : ["comments-"+postId]
            })

            const deleteCommentResponseMessage : string =deleteCommentResponseData as string || '';
            
            return {message : deleteCommentResponseMessage, type : ResponseType.success};

        },
    })
}

export default useDeleteComment;