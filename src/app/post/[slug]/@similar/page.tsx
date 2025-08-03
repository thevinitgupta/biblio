"use client";
import React, { Key } from "react";
import useFetchSimilarPosts from "@/hooks/useFetchSimilarPosts";
import Link from "next/link";

interface SimilarPostsProps {
  params: { slug: string };
}

const SimilarPosts = ({ params }: SimilarPostsProps) => {
  const {
    data: similarPostsData,
    error: similarPostsError,
    isLoading: isSimilarPostsLoading,
    refetch: refetchSimilarPosts,
  } = useFetchSimilarPosts({
    postId: params.slug,
  });

  if (isSimilarPostsLoading) {
    return (
      <div className="bg-base-200 rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold mb-6 text-base-content">
          Similar Posts
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-base-100 rounded-lg p-4">
              <div className="h-4 bg-base-300 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-base-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-base-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (similarPostsError) {
    return (
      <div className="bg-base-200 rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold mb-6 text-base-content">
          Similar Posts
        </h2>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-error text-sm text-center">
            Unable to load similar posts
          </p>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => refetchSimilarPosts()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!similarPostsData?.data || similarPostsData.data.length === 0) {
    return (
      <div className="bg-base-200 rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold mb-6 text-base-content">
          Similar Posts
        </h2>
        <div className="flex items-center justify-center py-8">
          <p className="text-base-content/60 text-sm">No similar posts found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-bold mb-6 text-base-content">
        Similar Posts
      </h2>
      <div className="space-y-3">
        {similarPostsData.data.map((post) => (
          <Link
            key={post.slug as Key}
            href={`/post/${post.slug}`}
            className="group block bg-base-100 hover:bg-base-300 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:scale-[1.02] border border-base-300 hover:border-primary/20"
          >
            <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarPosts;
