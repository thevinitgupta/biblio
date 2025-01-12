import useFetchPost from '@/hooks/useFetchPost';
import React from 'react'
import DetailsSkeleton from '../DetailsSkeleton';
import { Post } from '@/types/post';

const PostView = ({
    post
}:{
    post: Post
}) => {
    console.log("POST VIEW FOR ID : ", post)
  return (
    <main>
    <header className="hero-content px-6 lg:px-10 justify-start text-start flex-grow-0 w-full">
                        <h1 className="text-5xl font-bold text-primary">{post.title}</h1>
                        
                </header>
                <div className="divider divider-neutral"></div>
                <article className={`w-full px-6 lg:px-10 flex-grow mt-10 mb-16 prose prose-p:text-lg 
                prose-headings:text-primary prose-strong:text-primary prose-p:text-light-primary 
                prose-code:text-accent prose-img:rounded-md prose-li:text-secondary prose-a:text-info 
                max-w-full`}
                dangerouslySetInnerHTML={{__html : post.content}}>
                        
                  </article>

    </main>
  )
}

export default PostView