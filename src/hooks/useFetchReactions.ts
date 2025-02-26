import { PostDataResponseType as ReactionResponseData } from "@/types/common";
import { ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";
import { Post } from "@/types/post";
import { EntityReactions, EntityType, ReactionsResponseData } from "@/types/reaction";
import { privateAccessClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Define the return type for the useFetchUser  hook
type UseFetchReactionResponse = 
  { data: ReactionsResponseData | null; error: ErrorResponse 
   | null; isLoading: boolean };

const useFetchReactions  = ({
    entityId,
    entityType,
    enabled = false
} : {
    entityId : string,
    entityType : EntityType,
    enabled : boolean
}): UseFetchReactionResponse => {
    const queryClient = useQueryClient();
    const { sessionToken } = useGlobalStore();
    
    const { data, error, isLoading } = useQuery<ReactionsResponseData>({
        queryKey: ["reaction-"+entityId],
        queryFn: async (): Promise<ReactionsResponseData> => {
            let token = queryClient.getQueryData(['access-token']) || sessionToken || "";
            const headers = {
                Authorization: `Bearer ${token}`
            };

            

            try {
                const fetchUser  = await privateAccessClient.get(`/reaction?type=${entityType}&id=${entityId}`, {
                    headers
                });
                
                return {
                    message: "Success",
                    data: fetchUser.data.reactions as EntityReactions,
                    type: ResponseType.success
                };
            } catch (err) {
                const errorResp = (err as AxiosError).response?.data as ErrorResponse;
                console.log("Error Resp for Profile Data : ",errorResp);
                // Handle error and throw it to be caught by useQuery
                throw new Error(JSON.stringify(errorResp));
            }
        },
        enabled : enabled,
        retry: false,
        retryDelay: 25,
        refetchOnWindowFocus: false,
        throwOnError: false,
    });

    // Check if an error occurred and return appropriate data structure
    if (error) {
        const errorResponse = JSON.parse(error.message) as ErrorResponse;
        console.log("ERROR RESPONSE Reaction data : ", errorResponse)
        return {
            data: null,
            error: {
                error: "Failed to fetch Reaction",
                description: errorResponse.description || "An unexpected error occurred.",
                type: ResponseType.error
            },
            isLoading: false,
        };
    }

    return { data: data || null, error: error || null, isLoading };
}

export default useFetchReactions ;