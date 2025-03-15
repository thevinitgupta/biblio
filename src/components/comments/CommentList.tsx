import { Comments } from '@/types/comment'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'

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
        <Comment key={comment.id} comment={comment} removeComment={handleDelete} />
      ))}
      
    </>
  )
}

export default CommentList