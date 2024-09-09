import { Post } from "./post";

export interface UserI {
    id : string;
    firstName : string;
    lastName : string;
    email : string;
    posts : Post[];
}
