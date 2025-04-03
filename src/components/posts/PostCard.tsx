"use client"
import useFetchImage from '@/hooks/useFetchImage'
import { ResponseType } from '@/types/enums'
import { Post } from '@/types/post'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

import React, { MouseEventHandler } from 'react'
import { GoDotFill } from 'react-icons/go'

dayjs.extend(LocalizedFormat);

const PostCard = ({ post, displayImage = false }: { post: Post, displayImage?: boolean }) => {
    const router = useRouter();
    if (!post) return null;

    const handleViewPost = () => {
        router.push(`/post/${post.slug}`)
    }

    const { isLoading, data, isError } = useFetchImage({
        imageQueryKey: ["post-image-" + post.id],
        isPrivate: false,
        endpoint: "/posts/image/" + post.coverImage
    })

    return (
        <div className="card min-h-28 w-full ">
            {
                displayImage &&
                <figure className='max-h-[240px] rounded-md rounded-b-none'>{
                    !isLoading && (data?.type !== ResponseType.success || isError) ?
                        <img className="w-full h-full object-cover" src={post.book?.bookInfo?.imageLinks.thumbnail || "/pattern/auth.svg"} alt="Post Cover" /> 
                        :
                        isLoading && !data ?
                            <div className={`grid place-items-center w-full h-full`}>
                                <span className="loading loading-spinner text-accent"></span> 
                            </div> 
                            :
                            <img
                                src={data?.data!}
                                alt="Post Cover" />
                }
                </figure>
            }
            <div className="card-body">
                <h2 className="card-title text-2xl text-primary/90 overflow-hidden text-ellipsis whitespace-nowrap px-4 md:px-6  cursor-pointer" onClick={handleViewPost}>{post.title}</h2>
                <p className={`overflow-hidden text-ellipsis whitespace-nowrap mt-3 px-4 md:px-6 prose text-primary opacity-55`} dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '') }}></p>
                <div className="card-actions justify-end mt-5 items-center">
                <span className={`font-normal text-sm text-primary opacity-40`}>{dayjs(post.updatedAt|| Date.now()).format('LLL')}</span>
                <GoDotFill className={`text-base text-neutral opacity-60`} />
                    <span>{post.likes} Reactions</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard