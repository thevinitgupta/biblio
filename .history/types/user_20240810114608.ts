import { Post } from "./post";

export interface User {
    id : string;
    firstName : string;
    lastName : string;
    email : string;
    posts : Post[];
}


