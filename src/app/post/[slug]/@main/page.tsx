"use client";
import DetailsSkeleton from "@/components/DetailsSkeleton";
import PostActions from "@/components/posts/PostActions";
import PostView from "@/components/posts/PostView";
import useFetchPost from "@/hooks/useFetchPost";
import useFetchReactions from "@/hooks/useFetchReactions";
import { EntityType, EntityReactions } from "@/types/reaction";
import React from "react";

interface MainPostProps {
  params: { slug: string };
}

const MainPost = ({ params }: MainPostProps) => {
  const {
    data: postData,
    error: postError,
    isLoading: isPostLoading,
  } = useFetchPost({
    postId: params.slug,
  });

  const {
    data: reactionsData,
    error: reactionsError,
    isLoading: isReactionsLoading,
  } = useFetchReactions({
    entityId: postData?.data.id!,
    entityType: EntityType.POST,
    enabled: !!postData?.data.id,
  });

  if (postError || (postData && reactionsError)) {
    const errorMessage =
      postError?.description ||
      reactionsError?.description ||
      "An unexpected error occurred.";

    return (
      <main className="bg-base-200 min-h-screen w-full max-w-[876px] rounded-xl mx-auto flex flex-col items-center shadow-md">
        <div className="text-center mt-5">
          <p className="text-xl text-error">{errorMessage}</p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (isPostLoading || (postData && isReactionsLoading)) {
    return (
      <main className="bg-base-200 min-h-screen w-full max-w-[876px] rounded-xl mx-auto flex flex-col items-center shadow-md">
        <DetailsSkeleton lines={7} />
      </main>
    );
  }

  // Success state - both queries successful
  if (postData && reactionsData) {
    return (
      <main className="bg-base-200 min-h-screen w-full max-w-[876px] rounded-xl mx-auto flex flex-col items-center shadow-md">
        <PostActions post={postData.data} reactions={reactionsData.data} />
        <PostView
          post={postData.data}
          reactions={reactionsData.data as EntityReactions}
        />
      </main>
    );
  }

  return (
    <main className="bg-base-200 min-h-screen w-full max-w-[876px] rounded-xl mx-auto flex flex-col items-center shadow-md">
      <DetailsSkeleton lines={7} />
    </main>
  );
};

export default MainPost;
