import { Pagination, PostsDataResponseType, ProfileDataResponseType } from "@/types/common";
import { ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";
import { PostsI, UserI } from "@/types/user";
import { privateAccessClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { DefinedInitialDataInfiniteOptions, FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, QueryObserverResult, RefetchOptions, useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Define the return type for the useFetchUser  hook
type UseFetchPosts =
    {
        data: PostsDataResponseType | null; error: ErrorResponse
            | null; isLoading: boolean
    };

type UseFetchPostsInfinite = {
    data: InfiniteData<PostsDataResponseType> | undefined;
    error: ErrorResponse | null;
    isLoading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean | undefined;
    fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<PostsDataResponseType, unknown>, Error>>;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<InfiniteData<PostsDataResponseType, unknown>, Error>>;
};

const useFetchPosts = (): UseFetchPostsInfinite => {
    const queryClient = useQueryClient();
    const { sessionToken } = useGlobalStore();

    const { data, 
        error, 
        isLoading, 
        refetch, 
        fetchNextPage,
    isFetchingNextPage,
hasNextPage } = 
        useInfiniteQuery<PostsDataResponseType, Error>({
        queryKey: ["posts"],
        queryFn: async ({pageParam}) => {
            const currentPage = pageParam || 1;
            let token = queryClient.getQueryData(['access-token']) || sessionToken || "";
            const headers = {
                Authorization: `Bearer ${token}`
            };

            try {
                const fetchUser = await privateAccessClient.get("/posts", {
                    headers
                });
                return {
                    message: "Success",
                    data: fetchUser.data.posts as PostsI,
                    pagination : fetchUser.data.pagination as Pagination,
                    type: ResponseType.success
                };
            } catch (err) {
                const errorResp = (err as AxiosError).response?.data as ErrorResponse;
                console.log("Error Resp for Profile Data : ", errorResp);
                // Handle error and throw it to be caught by useQuery
                throw new Error(JSON.stringify(errorResp));
            }
        },
        getNextPageParam: (lastPage,allPages) => {
            const nextPage = lastPage.pagination.hasMore ? allPages.length + 1 : undefined;
            return nextPage;
        },
        initialPageParam : 1
    });

    // Check if an error occurred and return appropriate data structure
    if (error) {
        const errorResponse = JSON.parse(error.message) as ErrorResponse;
        console.log("ERROR RESPONSE PRofile data : ", errorResponse)
        return {
            data: undefined,
            error: {
                error: "Failed to fetch user data",
                description: errorResponse.description || "An unexpected error occurred.",
                type: ResponseType.error
            },
            isLoading: false,
            isFetchingNextPage: false,
            hasNextPage: false,
            fetchNextPage,
            refetch
        };
    }

    return { data: data || undefined, error: error || null, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch };
}

export default useFetchPosts;