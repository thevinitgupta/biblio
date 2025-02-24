import { ResponseType } from "@/types/enums";

import { EntityType, ReactionData, ReactionSchema, ReviewReactionStringType } from "@/types/reaction";
import { privateAccessClient } from "@/utils/axiosUtil";

import useGlobalStore from "@/utils/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {AxiosResponse} from 'axios';


const useToggleReaction = ({
    entityId,
}:{
    entityId : string,
}) => {
    const queryClient = useQueryClient();
    const {sessionToken} = useGlobalStore();
    return useMutation({
        mutationKey: [`toggle-reaction-${entityId}`],
        mutationFn: async ({
            reactionType = "love",
            entityType = EntityType.POST
        }: {
                reactionType : ReviewReactionStringType,
                entityType : EntityType
            }) => {
            
            const token = sessionToken || queryClient.getQueryData(['access-token']);

            // DONE : Modify the post body to match API and create separate type

            console.log("Toggle Post Reaction Data : "+reactionType)
            const toggleReactionData : ReactionData = {
                entityType,
                entityId,
                reactionType
            };

            ReactionSchema.parse(toggleReactionData);


            const headers = {
                "Authorization": `Basic ${token?.trim()}`,    
            }

            console.log("Create Post headers : ",headers);
            try {
            const toggleReactionResponse : AxiosResponse = await privateAccessClient.post('/reaction',toggleReactionData, {
                headers : headers    
            });
                console.log("Create Post Response : ",toggleReactionResponse)
            const toggleReactionResponseData = toggleReactionResponse.data;

            queryClient.invalidateQueries({
                queryKey : ["reaction-"+entityId]
            })

            const toggleReactionResponseMessage : string = toggleReactionResponseData as string || '';
            
            return {message : toggleReactionResponseMessage, type : ResponseType.success};
        } catch (error) {
            console.log("Error in Toggle Reaction : ",error);
            // throw new Error("Error in Toggle Reaction");
        }

        },
    })
}

export default useToggleReaction;