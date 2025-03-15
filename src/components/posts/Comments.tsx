import useFetchComments from '@/hooks/useFetchComments';
import React, { useEffect, useState } from 'react'
import CommentList from '../comments/CommentList';
import CreateComment from '../comments/CreateComment';
import Button from '../Button';

const Comments = ({
    postId
}: {
    postId: string
}) => {
    const { 
        data,
        error: comments_error,
        isLoading: comments_loading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useFetchComments({
        postId: postId,
        
    });

    // Flatten the pages array to get all comments
    const allComments = data?.pages.flatMap(page => page.data) || [];

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return (
        <section id='post-comment' className={`w-full min-h-32 flex flex-col justify-start items-center gap-8 mt-6`}>
            <header className={`w-full px-6 text-start text-xl md:text-3xl font-bold`}>Comments</header>

            <main className={`w-full px-6 text-start`}>
                <CreateComment postId={postId} />
                {
                    (comments_loading && !data) &&
                    <span className="loading loading-spinner text-accent text-2xl"></span>
                }
                {
                    !comments_loading && comments_error &&
                    <p className='text-center text-2xl text-error'>
                        {comments_error.description || "An unexpected error occurred."}</p>
                }
                {
                    data && allComments.length === 0 &&
                    <p className='text-center text-lg text-neutral-500'>No comments yet. Be the first to comment!</p>
                }
                {
                    data && allComments.length > 0 &&
                    <CommentList comments={allComments} />
                }
                
                {/* Load more button - only show if there are more comments to load */}
                {
                    data && allComments.length > 0 && hasNextPage && (
                        <div className="flex justify-center mt-4">
                            <Button.Neutral 
                                onClick={() => {
                                    handleLoadMore();}} 
                                message={isFetchingNextPage ? 'Loading more...' : 'Load more comments'} 
                                styles={`text-sm px-6 ${isFetchingNextPage ? 'opacity-70 cursor-not-allowed' : ''}`}
                                btnDisabled={isFetchingNextPage || !hasNextPage}
                            />
                        </div>
                    )
                }
                
                {/* Show loading indicator when fetching next page */}
                {
                    isFetchingNextPage &&
                    <div className="flex justify-center mt-2">
                        <span className="loading loading-spinner text-accent"></span>
                    </div>
                }
            </main>
        </section>
    )
}

export default Comments