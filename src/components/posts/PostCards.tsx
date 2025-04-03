"use client";
import { UserI } from '@/types/user';
import React, { MouseEventHandler, useEffect } from 'react'

import useFetchPosts from '@/hooks/useFetchPosts';
import DetailsSkeleton from '@/components/DetailsSkeleton';
import PostCard from './PostCard';
import InfiniteScroll from 'react-infinite-scroll-component';


const PostCards = () => {
  const { data, error, isLoading, isFetchingNextPage, hasNextPage, refetch, fetchNextPage } = useFetchPosts();
  
  const allPosts = data?.pages.flatMap(page => page.data) || [];

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

  if (isLoading) {
      return <DetailsSkeleton lines={4}/>;
  }

  if (error) {
      return (
          <div className={`text-center mt-5`}>
              {/* <h2 >Oops! No Posts here</h2> */}
              <p className={`text-xl`}>{error.description || "An unexpected error occurred."}</p>
          </div>
      );
  }
 
// DONE : Modify design of post cards and first card to have image (half done) 
// DONE : Add Pagination to posts - Infinite Scroll
  return (
    
      <div className={`flex flex-wrap justify-center items-stretch w-full`}>
          <InfiniteScroll 
          dataLength={allPosts ? allPosts.length : 0}
          next={handleLoadMore}
          hasMore={hasNextPage!}
          loader={<DetailsSkeleton lines={2}/>}>
          {allPosts && allPosts.map((post, index) => {
            return (
                <>
                <PostCard key={post.id} post={post} displayImage={index===0}/>
                {
                    
                    index < allPosts.length-1 
                    && 
                    <div className="divider w-full"></div>
                }
                </>
            );
          })}
          </InfiniteScroll>
      </div>
  );
};
export default PostCards