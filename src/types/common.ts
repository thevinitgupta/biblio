import { ResponseType } from "./enums"
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

