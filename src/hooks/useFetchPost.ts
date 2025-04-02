import { PostDataResponseType } from "@/types/common";
import { ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";
import { Post } from "@/types/post";
import { privateAccessClient, publicClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Define the return type for the useFetchUser  hook
type UseFetchPost = 
  { data: PostDataResponseType | null; error: ErrorResponse 
   | null; isLoading: boolean };

const useFetchPost  = ({
    postId
} : {
    postId : string
}): UseFetchPost => {
    const queryClient = useQueryClient();
    const { sessionToken } = useGlobalStore();
    
    const { data, error, isLoading } = useQuery<PostDataResponseType>({
        queryKey: ["post-"+postId],
        queryFn: async (): Promise<PostDataResponseType> => {
            let token = queryClient.getQueryData(['access-token']) || sessionToken || "";
            
            

            try {
                const fetchUser  = await publicClient.get("/posts?postId="+postId);
                return {
                    message: "Success",
                    data: fetchUser.data.post as Post,
                    type: ResponseType.success
                };
            } catch (err) {
                const errorResp = (err as AxiosError).response?.data as ErrorResponse;
                console.log("Error Resp for Profile Data : ",errorResp);
                // Handle error and throw it to be caught by useQuery
                throw new Error(JSON.stringify(errorResp));
            }
        },
        retry: false,
        retryDelay: 25,
        refetchOnWindowFocus: false,
        throwOnError: false,
    });

    // Check if an error occurred and return appropriate data structure
    if (error) {
        const errorResponse = JSON.parse(error.message) as ErrorResponse;
        console.log("ERROR RESPONSE POST data : ", errorResponse)
        return {
            data: null,
            error: {
                error: "Failed to fetch post",
                description: errorResponse.description || "An unexpected error occurred.",
                type: ResponseType.error
            },
            isLoading: false,
        };
    }

    return { data: data || null, error: error || null, isLoading };
}

export default useFetchPost ;