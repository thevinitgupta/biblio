import PostCards from '@/components/posts/PostCards'
import Link from 'next/link'
import React from 'react'

const Posts = () => {
    return (         
            <div className="bg-base-200 min-h-screen w-full rounded-xl mx-auto flex flex-col items-center">
            {/* h-4/5 w-[90%] rounded-xl mx-auto flex flex-col justify-center items-center gap-16"> */}

                <div className="hero-content text-center flex-grow-0">
                    <div className="w-full">
                        <h1 className="text-5xl font-bold">Explore Testaments!</h1>
                        
                    </div>
                </div>

                <div className={`w-full flex-grow mt-10`}>
                <PostCards/>
                </div>
            </div>
    )
}

export default Posts