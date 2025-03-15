import { Comments } from "./comment"
import { ResponseType } from "./enums"
import { Post } from "./post"
import { UserI } from "./user"

export type ServerResponseType = {
    message : string,
    type : ResponseType,
    error? : any
}

export type ProfileDataResponseType = {
    message : string,
    type : ResponseType,
    data : UserI
}

export type ImageDataResponseType = {
    message : string,
    type : ResponseType,
    data : string
}
export type PostDataResponseType = {
    message : string,
    type : ResponseType,
    data : Post
}

export type PostsDataResponseType = {
    message : string,
    type : ResponseType,
    data : Array<Post>
}


export type CommentsDataResponseType = {
    message : string,
    type : ResponseType,
    data : Comments,
    pagination : Pagination
}

export type Pagination = {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    hasMore: boolean;
}