import { ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";
import { encryptionClient, publicClient } from "@/utils/axiosUtil"
import useGlobalStore from "@/utils/zustand";
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";

interface PublicKeyFetchResponse {
    data: string | null;
    error: ErrorResponse | null;
    isLoading: boolean;
}

const useFetchPublicKey = (): PublicKeyFetchResponse => {
    const { data, isLoading, error } = useQuery<string>({
        queryKey: ["public", "key"],
        queryFn: async () => {
            try {
                const response = await encryptionClient.get("/key/public");
                console.log("FETCHING PUBLIC KEY RESPONSE : ", response)
                return response.data;
            } catch (err) {
                const errorResp = (err as AxiosError).response?.data as ErrorResponse;
                console.log("Error Resp for Fetching public Key : ", errorResp);
                // Handle error and throw it to be caught by useQuery
                throw new Error(JSON.stringify(errorResp));
            }
        },
        retry: false
    });

    if (error) {
        console.log("Error : ", error);
        const errorResponse = JSON.parse(error.message) as ErrorResponse;
        console.log("ERROR RESPONSE Reaction data : ", errorResponse)
        return {
            data: null,
            error: {
                error: "Failed to fetch Reaction",
                description: errorResponse.description || "An unexpected error occurred.",
                type: ResponseType.error
            },
            isLoading: isLoading
        }
    }
    else {
        return {
            data: data || null,
            error: null,
            isLoading: isLoading
        }
    }
}

export default useFetchPublicKey;