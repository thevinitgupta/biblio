import {
  SimilarPostResponseDataI,
  SimilarPostsResponseI,
} from "@/types/common";
import { ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";
import { publicClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Define the return type for the useFetchUser  hook
type UseFetchSimilarPosts = {
  data: SimilarPostsResponseI | null;
  error: ErrorResponse | null;
  isLoading: boolean;
  refetch: () => void;
};

const useFetchSimilarPosts = ({
  postId,
}: {
  postId: string;
}): UseFetchSimilarPosts => {
  const queryClient = useQueryClient();
  const { sessionToken } = useGlobalStore();

  const { data, error, isLoading, refetch } = useQuery<SimilarPostsResponseI>({
    queryKey: ["similar-post-" + postId],
    queryFn: async (): Promise<SimilarPostsResponseI> => {
      let token =
        queryClient.getQueryData(["access-token"]) || sessionToken || "";

      try {
        console.log("CALLING SIMILAR POSTS : ", "/posts/similar/" + postId);
        const fetchSimilarPosts = await publicClient.get(
          "/posts/similar/" + postId,
        );
        console.log("SIMILAR POSTS : ");

        return {
          data: fetchSimilarPosts.data as Array<SimilarPostResponseDataI>,
          type: ResponseType.success,
          message: "success",
        };
      } catch (err) {
        const errorResp = (err as AxiosError).response?.data as ErrorResponse;
        console.log("Error Resp for Similar Posts Data : ", errorResp);
        throw new Error(JSON.stringify(errorResp));
      }
    },
    retry: false,
    retryDelay: 25,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  if (error) {
    const errorResponse = JSON.parse(error.message) as ErrorResponse;
    console.log("ERROR RESPONSE SIMILAR POST data : ", errorResponse);
    return {
      data: null,
      error: {
        error: "Failed to fetch post",
        description:
          errorResponse.description || "An unexpected error occurred.",
        type: ResponseType.error,
      },
      isLoading: false,
      refetch: () => refetch(),
    };
  }

  return { data: data || null, error: error || null, isLoading, refetch };
};

export default useFetchSimilarPosts;
