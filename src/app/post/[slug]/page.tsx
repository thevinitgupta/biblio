"use client"
import DetailsSkeleton from '@/components/DetailsSkeleton';
import PostActions from '@/components/posts/PostActions';
import PostView from '@/components/posts/PostView';
import useFetchPost from '@/hooks/useFetchPost';
import useFetchReactions from '@/hooks/useFetchReactions';
import { EntityReactions, EntityType } from '@/types/reaction';
import React, { PropsWithChildren } from 'react'

const PostPage = ({
  params
}: {
  params: { slug: string }
}) => {
  console.log("Dynamic Route Props : ", params)
  const { data, error, isLoading } = useFetchPost({
    postId : params.slug
  });

  const {
    data : reactions_data, 
    error:fetch_reactions_error, 
    isLoading : fetch_reactions_loading
  } = useFetchReactions({
    entityId : params.slug,
    entityType : EntityType.POST,
    enabled : !isLoading && !error,
  })



  return (
    <main className="bg-base-200 min-h-screen w-full max-w-[876px] rounded-xl mx-auto flex flex-col items-center shadow-md">
      {/* h-4/5 w-[90%] rounded-xl mx-auto flex flex-col justify-center items-center gap-16"> */}

      {
        isLoading && fetch_reactions_loading &&
        <DetailsSkeleton lines={7} />
      }

      {
        !isLoading && error && !fetch_reactions_loading && fetch_reactions_error &&
        <div className={`text-center mt-5`}>
          {/* <h2 >Oops! No Posts here</h2> */}
          <p className={`text-xl`}>{error.description || "An unexpected error occurred."}</p>
        </div>
      }
      {
        !isLoading && !error && data && !fetch_reactions_loading && !fetch_reactions_error && 
        <>
        <PostActions post={data.data} reactions={reactions_data?.data!} />
        <PostView post={data.data} 
        reactions={reactions_data?.data! as EntityReactions} />
        </>

      }
    </main>
  )
}

export default PostPage