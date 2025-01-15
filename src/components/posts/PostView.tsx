
import React from 'react'

import { Post } from '@/types/post';

const PostView = ({
    post
}:{
    post: Post
}) => {

  return (
    <>
    <header className="px-6 md:px-10 py-6 md:py-8 justify-start text-start flex-grow-0 w-full text-2xl md:text-5xl font-bold text-primary">
                       {post.title}
                        
                </header>
                <div className="divider divider-neutral"></div>
                <article className={`w-full px-6  md:px-10 flex-grow mt-10 mb-16 prose prose-p:text-lg md:prose-p:text-xl 
                prose-headings:text-primary prose-strong:text-primary prose-p:text-light-primary 
                prose-code:text-accent prose-img:rounded-md prose-li:text-secondary prose-a:text-info 
                max-w-full`}
                dangerouslySetInnerHTML={{__html : post.content}}>
                        
                  </article>

    </>
  )
}

export default PostView