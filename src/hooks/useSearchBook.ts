import { BookSearchResponse } from "@/types/book";
import { PostDataResponseType } from "@/types/common";
import { ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";
import { Post } from "@/types/post";
import { privateAccessClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Define the return type for the useFetchUser  hook
type UseSearchBook = 
  { data: BookSearchResponse | null; error: ErrorResponse 
   | null; isLoading: boolean };

const useSearchBook  = ({
    query
} : {
    query : string
}): UseSearchBook => {
    const queryClient = useQueryClient();
    const { sessionToken } = useGlobalStore();

    const { data, error, isLoading } = useQuery<BookSearchResponse>({
        queryKey: ["book-"+query],
        queryFn: async (): Promise<any> => {
            let token = queryClient.getQueryData(['access-token']) || sessionToken || "";
            const headers = {
                Authorization: `Bearer ${token}`
            };

            

            try {
                const fetchBook  = await privateAccessClient.get("/book/search?query="+query, {
                    headers
                });

                console.log(fetchBook)
                return {
                    message: "Success",
                    items: fetchBook.data.items as BookSearchResponse,
                    type: ResponseType.success
                };
            } catch (err) {
                const errorResp = (err as AxiosError).response?.data as ErrorResponse;
                console.log("Error Resp for Fetch Book Query : ",errorResp);
                // Handle error and throw it to be caught by useQuery
                throw new Error(JSON.stringify(errorResp));
            }
        },
        enabled: query.length > 0, 
        retry: false,
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

export default useSearchBook ;