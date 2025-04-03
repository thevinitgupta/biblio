import { CommentsDataResponseType, Pagination, PostsDataResponseType, ProfileDataResponseType } from "@/types/common";
import { ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";
import { PostsI, UserI } from "@/types/user";
import { privateAccessClient, publicClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { 
  QueryObserverResult, 
  RefetchOptions, 
  useInfiniteQuery, 
  useQueryClient,
  InfiniteData,
  FetchNextPageOptions,
  InfiniteQueryObserverResult
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Comments } from "@/types/comment";



// Define the return type for the useFetchComments hook with infinite query
type UseFetchCommentsInfinite = {
  data: InfiniteData<CommentsDataResponseType> | undefined;
  error: ErrorResponse | null;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<CommentsDataResponseType,unknown>, Error>>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<InfiniteData<CommentsDataResponseType,unknown>, Error>>;
};

const useFetchComments = ({
  postId,
  initialPage = 1
}: {
  postId: string;
  initialPage?: number;
}): UseFetchCommentsInfinite => {
  const queryClient = useQueryClient();
  const { sessionToken } = useGlobalStore();

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    
  } = useInfiniteQuery<CommentsDataResponseType, Error>({
    queryKey: ["comments-" + postId],
    queryFn: async ({ pageParam }) => {
        const currentPage = pageParam || initialPage;
      // let token = queryClient.getQueryData(['access-token']) || sessionToken || "";
      // const headers = {
      //   Authorization: `Bearer ${token}`
      // };

      try {
        const fetchComments = await publicClient.get(`/comment/${postId}?page=${currentPage}`);
        
        // Create response matching CommentsDataResponseType
        const response: CommentsDataResponseType = {
          message: "Success",
          data: fetchComments.data.comments as Comments,
          pagination: fetchComments.data.pagination as Pagination,
          type: ResponseType.success
        };
        
        return response;
      } catch (err) {
        const errorResp = (err as AxiosError).response?.data as ErrorResponse;
        console.log("Error Resp for Comments Data: ", errorResp);
        throw new Error(JSON.stringify(errorResp));
      }
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    // This is critical - it prevents automatic loading of the next page
    getNextPageParam: (lastPage) => {
        console.log("FETCH NEXT CALLED : \nTotal Pages",lastPage.pagination.totalPages, "\nCurrentPage:",lastPage.pagination.currentPage)
      if (lastPage.pagination?.hasMore) {
        return lastPage.pagination.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: initialPage,
    retry: false,
    retryDelay: 25,
    refetchOnWindowFocus: false,
  });

  // Check if an error occurred and return appropriate data structure
  if (error) {
      console.log("ERROR RESPONSE Comments data: ", error);
    const errorResponse = JSON.parse(error.message) as ErrorResponse;
    
    return {
      data: undefined,
      error: {
        error: "Failed to fetch comments",
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

  return {
    data,
    error: null,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch
  };
};

export default useFetchComments;