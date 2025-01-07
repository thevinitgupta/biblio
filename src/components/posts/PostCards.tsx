"use client";
import { UserI } from '@/types/user';
import React, { useEffect } from 'react'

import useFetchPosts from '@/hooks/useFetchPosts';
import DetailsSkeleton from '@/components/DetailsSkeleton';
import PostCard from './PostCard';

const PostCards = () => {
  const { data, error, isLoading } = useFetchPosts();

  if (isLoading) {
      return <DetailsSkeleton lines={2}/>;
  }

  if (error) {
      return (
          <div className={`text-center mt-5`}>
              {/* <h2 >Oops! No Posts here</h2> */}
              <p className={`text-xl`}>{error.description || "An unexpected error occurred."}</p>
          </div>
      );
  }


  return (
      <div className={`flex flex-wrap gap-5 justify-center items-stretch w-full`}>
          {data && data.data.map((post, index) => {
            return (
                <PostCard key={post.id} post={post}/>
            );
          })}
      </div>
  );
};
export default PostCards