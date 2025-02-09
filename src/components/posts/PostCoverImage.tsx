"use client";
import useFetchImage from '@/hooks/useFetchImage';
import { ResponseType } from '@/types/enums';
import { Post } from '@/types/post';
import React from 'react'
import Image from 'next/image';

const PostCoverImage = ({
    post
}: {
    post : Post
}) => {
    const { isLoading, data, isError } = useFetchImage({
        imageQueryKey: ["post-image-"+post.id],
        isPrivate: false,
        endpoint: "/posts/image/"+post.coverImage
      });

      
  return (
    <div className={`w-full h-60 rounded-none md:rounded-xl  md:rounded-b-none overflow-hidden relative`}>{
        !isLoading && (data?.type !== ResponseType.success || isError) ?
        <img className="w-full h-full object-cover" src={post.book?.bookInfo?.imageLinks.thumbnail || "/pattern/auth.svg"} alt="Post Cover Image" /> :
        isLoading && !data ?
        <div className={`grid place-items-center w-full h-full`}><span className="loading loading-spinner text-accent"></span> </div>:
        <Image className="w-full h-full object-cover" 
            src={data?.data!} 
            alt={post.book?.bookInfo?.title!}
            layout="fill" />
    }</div>
  )
}

export default PostCoverImage