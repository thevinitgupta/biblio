"use client"
import DetailsSkeleton from '@/components/DetailsSkeleton';
import PostView from '@/components/posts/PostView';
import useFetchPost from '@/hooks/useFetchPost';
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



  return (
    <main className="bg-base-200 min-h-screen w-full rounded-xl mx-auto flex flex-col items-center">
      {/* h-4/5 w-[90%] rounded-xl mx-auto flex flex-col justify-center items-center gap-16"> */}

      {
        isLoading &&
        <DetailsSkeleton lines={7} />
      }

      {
        !isLoading && error &&
        <div className={`text-center mt-5`}>
          {/* <h2 >Oops! No Posts here</h2> */}
          <p className={`text-xl`}>{error.description || "An unexpected error occurred."}</p>
        </div>
      }
      {
        !isLoading && !error && data &&
        <PostView post={data.data} />
      }
    </main>
  )
}

export default PostPage