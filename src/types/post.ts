import { Book } from "./book";

export interface Post {
    id : string;
    title : string;
    content : string;
    likes : number;
    comments : string[];
    book : Book | null;
    coverImage : string;
    slug : string;
    createdAt: Date,
    updatedAt: Date,
}

