import { PostsDataResponseType, ProfileDataResponseType } from "@/types/common";
import { ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";
import { PostsI, UserI } from "@/types/user";
import { privateAccessClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Define the return type for the useFetchUser  hook
type UseFetchPosts = 
  { data: PostsDataResponseType | null; error: ErrorResponse 
   | null; isLoading: boolean };

const useFetchPosts  = (): UseFetchPosts => {
    const queryClient = useQueryClient();
    const { sessionToken } = useGlobalStore();
    
    const { data, error, isLoading } = useQuery<PostsDataResponseType>({
        queryKey: ["posts"],
        queryFn: async (): Promise<PostsDataResponseType> => {
            let token = queryClient.getQueryData(['access-token']) || sessionToken || "";
            const headers = {
                Authorization: `Bearer ${token}`
            };

            try {
                const fetchUser  = await privateAccessClient.get("/posts", {
                    headers
                });
                return {
                    message: "Success",
                    data: fetchUser.data as PostsI,
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
        console.log("ERROR RESPONSE PRofile data : ", errorResponse)
        return {
            data: null,
            error: {
                error: "Failed to fetch user data",
                description: errorResponse.description || "An unexpected error occurred.",
                type: ResponseType.error
            },
            isLoading: false,
        };
    }

    return { data: data || null, error: error || null, isLoading };
}

export default useFetchPosts ;