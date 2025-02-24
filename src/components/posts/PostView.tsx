
import React from 'react'

import { Post } from '@/types/post';
import BackgroundImage from '@/app/auth/BackgroundImage';
import { authClient } from '@/utils/axiosUtil';
import PostCoverImage from './PostCoverImage';
import { EntityReactions, ReactionData, ReviewReactionType } from '@/types/reaction';
import { REVIEW_REACTIONS } from '@/constants/reactions';

const PostView = ({
    post,
    reactions
}:{
    post: Post,
    reactions : EntityReactions
}) => {

  return (
    <>
    
    <PostCoverImage post={post}/>

    <header className="px-10 py-6 pt-10 flex flex-col justify-between text-start flex-grow-0 w-full text-2xl md:text-5xl font-bold text-primary">
                       {post.title}
                </header>
                <div className='w-full py-4 px-10 flex justify-start items-center gap-4'>
                {
                  post.book ? 
                  <div className="badge badge-accent badge-outline badge-lg">Book : {
                    post.book?.bookInfo?.title
                }</div> : 
                <div className="badge badge-warning badge-outline badge-md">No Book Tagged</div>
                }
                </div>
                <ul
                    
                    className="bg-base-200 w-full flex flex-row flex-nowrap justify-start gap-10 text-2xl px-10">
                    {REVIEW_REACTIONS.map((reaction: ReviewReactionType, index: number) => {
                        return (
                            <li key={index} className={`flex items-center justify-center gap-2`}>
                                {reaction.emoji}
                                <span className='text-sm'>{reactions.reactionsMap[reaction.type]}</span>
                            </li>
                        )
                    })}
                </ul>
                <div className=" divider divider-neutral"></div>
                <article className={`w-full max-w-full px-10 flex-grow mt-10 mb-16 prose prose-p:text-lg md:prose-p:text-xl 
                prose-headings:text-primary prose-strong:text-primary prose-p:text-light-primary 
                prose-code:text-accent prose-img:rounded-md prose-li:text-secondary prose-a:text-info
               `}
                dangerouslySetInnerHTML={{__html : post.content}}>
                        
                  </article>

    </>
  )
}

export default PostView