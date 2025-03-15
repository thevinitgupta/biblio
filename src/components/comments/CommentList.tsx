import { Comments } from '@/types/comment'
import React, { useEffect, useState } from 'react'
import CommentItem from './Comment'

const CommentList = ({
  comments
}: {
  comments: Comments
}) => {
  const [localComments, setLocalComments] = useState(comments);

  const handleDelete = (commentId: string) => {
    const newComments = localComments.filter((comment) => comment.id !== commentId);
    setLocalComments(newComments);
  }

  useEffect(() => {
    setLocalComments(comments);
  }, [comments])
  return (
    <>

      {localComments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} removeComment={handleDelete} />
      ))}
      
    </>
  )
}

export default CommentList