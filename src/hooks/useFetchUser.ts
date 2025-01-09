import { ProfileDataResponseType } from "@/types/common";
import { ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";
import { UserI } from "@/types/user";
import { privateAccessClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Define the return type for the useFetchUser  hook
type UseFetchUser = 
  { data: ProfileDataResponseType | null; error: ErrorResponse 
   | null; isLoading: boolean };

const useFetchUser  = (): UseFetchUser => {
    const queryClient = useQueryClient();
    const { sessionToken } = useGlobalStore();
    
    const { data, error, isLoading } = useQuery<ProfileDataResponseType>({
        queryKey: ["profile"],
        queryFn: async (): Promise<ProfileDataResponseType> => {
            let token = queryClient.getQueryData(['access-token']);
            token = token || sessionToken || "";
            const headers = {
                Authorization: `Bearer ${token}`
            };

            console.log("HEADER FOR USER : ",headers)

            try {
                const fetchUser  = await privateAccessClient.get("/user", {
                    headers
                });
                return {
                    message: "Success",
                    data: fetchUser .data as UserI,
                    type: ResponseType.success
                };
            } catch (err) {
                const errorResp = (err as AxiosError).response?.data as ErrorResponse;
                console.log("Error Resp for Profile Data : ",errorResp);
                // Handle error and throw it to be caught by useQuery
                throw new Error(JSON.stringify(errorResp));
            }
        },
        retry: 2,
        retryDelay: 60,
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

export default useFetchUser ;