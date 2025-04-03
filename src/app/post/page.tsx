import FilterPosts from '@/components/posts/Filter'
import PostCards from '@/components/posts/PostCards'
import PostSuggestions from '@/components/posts/Suggestions'
import Link from 'next/link'
import React from 'react'

const Posts = () => {
    return (         
            <main className="bg-base-100 min-h-screen w-full rounded-xl mx-auto flex items-start justify-start gap-6 px-0 md:px-6">
            {/* h-4/5 w-[90%] rounded-xl mx-auto flex flex-col justify-center items-center gap-16"> */}
                
                <FilterPosts/>

                <section className="bg-base-200 min-h-[80vh] flex-1 rounded-xl mx-auto flex flex-col items-center shadow-md">
                    
                
                <div className={`w-full flex-grow`}>
                <PostCards/>
                </div>
                </section>

                {/* Suggested Content */}

                <PostSuggestions/>
            </main>
    )
}

export default Posts