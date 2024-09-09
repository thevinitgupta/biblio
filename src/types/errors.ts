import { ResponseType } from "./enums"

export enum applicationErrors {
    INTERNET_ERROR,
    NETWORK_ERROR,
    SERVER_ERROR,
    UNKNOWN_ERROR,
    NO_DATA_ERROR,
    NO_AUTH_ERROR,
    NO_PERMISSION_ERROR,
    HTTP_ERROR
}

export type ErrorResponse = {
    error : string,
    description : string,
    type : ResponseType
}