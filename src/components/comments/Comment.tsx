import { Comment } from '@/types/comment'
import React, { useEffect, useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { LuMessageSquareReply } from "react-icons/lu";
import { RiHeartAdd2Line,RiDeleteBin2Line } from 'react-icons/ri'
import useReactionHandler from '@/hooks/useReactionHandler'
import { EntityType, ReviewReactionType } from '@/types/reaction'
import { REVIEW_REACTIONS } from '@/constants/reactions'
import CreateComment from './CreateComment'
import useGlobalStore from '@/utils/zustand'
import useDeleteComment from '@/hooks/useDeleteComment'
import EditComment from './EditComment'

dayjs.extend(LocalizedFormat);

const CommentItem = ({ comment, removeComment}: {
    comment: Comment,
    removeComment?: (commentId : string) => void
}) => {

    const [userReacted, setUserReacted] = useState(comment.commentReactions.userReacted!);
    const [reactionCount, setReactionCount] = useState(comment.commentReactions.totalReactions || 0);
    const [replyActive, setReplyActive] = useState(false);
    const [editActive, setEditActive] = useState(false);
    

    const { handleReaction,
        isPending,
        error: toggle_reaction_error } = useReactionHandler(comment.id!);

        const { mutate : delete_comment, isPending : delete_pending } = useDeleteComment();

        const { user } = useGlobalStore();

    const toggleReplyOption = () => {
        setReplyActive(!replyActive);
    }

    const handleReactionLocally = () => {
        console.log("Handle Reaction Locally called")
        if (userReacted) {
            setReactionCount((prevCount) => prevCount - 1);
        }
        else {
            setReactionCount((prevCount) => prevCount + 1);
        }
        setUserReacted(!userReacted);
        handleReaction("love", EntityType.COMMENT);
        console.log("Now Liked : " + userReacted)
    }

    const handleDeleteComment = () => {
        delete_comment({
            commentId : comment.id!,
            postId : comment.postId
        }, {
            onSuccess: () => {
                removeComment && removeComment(comment.id!);
            }
        })
    }

    const toggleEditOption = () => {
        console.log("Toggle Edit called : ",editActive)
        setEditActive(!editActive);
    }

    return (
        <div className={`w-full flex flex-col justify-start items-start gap-4 p-4 mb-4 ml-4 border border-r-0 border-t-0 border-b-0  border-neutral`}>
            <p className={`text-xl font-semibold flex items-center justify-start gap-4`}>
                {comment.authorName}
                <GoDotFill className={`text-base text-neutral opacity-60`} />
                <span className={`font-normal text-sm text-primary opacity-40`}>{dayjs(comment.updatedAt).format('LLL')}</span>
            </p>
            {
                editActive ?
                <EditComment comment={comment} toggleEditOption={toggleEditOption} />
                :
                <p className={`text-base font-mono`}>{comment.content}</p>
            }
            {
                !editActive && 
                <div className={`w-full flex justify-start items-center gap-4`}>
                <button onClick={() => {
                    handleReactionLocally();

                }} className={`btn btn-xs`}>
                    <RiHeartAdd2Line className={`text-xl opacity-50 hover:opacity-85 ${userReacted ? "text-red-500" : "text-primary"} hover:text-red-500`} />
                    {reactionCount || ""}
                    <span className={`text-primary opacity-50 text-sm font-light ml-1`}>
                        Like{reactionCount > 1 && 's'}
                    </span>
                </button>
                {!comment.parentCommentId &&
                    <button onClick={toggleReplyOption} className={`btn btn-xs`}>
                        <LuMessageSquareReply className={`text-xl text-primary opacity-50`} />
                        <span className={`text-primary opacity-50 text-sm font-light`}>Reply</span>
                    </button>
                }
                {
                    user && user.email===comment.authorId && 
                    <button onClick={toggleEditOption} className={`btn btn-xs`}>
                        <span className={`text-primary opacity-50 text-sm font-light`}>Edit</span>
                    </button>
                }
                {
                    user && user.email===comment.authorId && 
                    <button onClick={handleDeleteComment} className={`btn btn-xs `}>
                        <RiDeleteBin2Line 
                        className={`text-xl opacity-60 hover:opacity-90
                         text-red-500`} />
                        <span className={`opacity-50 text-sm font-light`} hidden>Delete</span>
                    </button>
                }
                </div>
            }
            {
                replyActive && 
                <CreateComment postId={comment.postId} parentId={comment.id} toggleReplyOption={toggleReplyOption} />
            }
            {
                comment.replies.length > 0 &&

                comment.replies.map((reply) => {
                    return (
                        <CommentItem key={reply.id} comment={reply}/>
                    )
                })

            }
        </div>
    )
}

export default CommentItem