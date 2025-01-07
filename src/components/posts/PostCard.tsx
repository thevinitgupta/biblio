import { Post } from '@/types/post'
import React from 'react'

const PostCard = ({ post }: { post: Post }) => {
    if (!post) return null;
    return (
        <div className="card min-h-28 w-full bg-base-100 max-w-[85vw] md:max-w-[35vw] lg:max-w-[28vw] shadow-inner shadow-slate-700">
            <div className="card-body">
                <h2 className="card-title text-primary/90 overflow-hidden text-ellipsis whitespace-nowrap">{post.title}</h2>
                <p className={`text-primary/35 overflow-hidden text-ellipsis whitespace-nowrap mt-5`}>{post.content.substring(0, 100)}...</p>
                <div className="card-actions justify-end mt-5">
                    <button className="btn bg-accent hover:bg-base-200 text-accent-content hover:text-primary border border-accent hover:border-accent">View Post</button>
                </div>
            </div>
        </div>
    )
}

export default PostCard