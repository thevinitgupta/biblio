import { CommentReactions } from "./reaction";

export type Comment = {
    id: string,
    postId: string,
    content: string,
    authorId: string,
    authorName: string,
    parentCommentId: string,
    createdAt: Date,
    updatedAt: Date,
    commentReactions: CommentReactions,
    replies: Array<Comment>
}

export type Comments =  Array<Comment>;
    