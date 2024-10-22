import Error, { ErrorProps } from "next/error";

export class AuthorizationException extends Error {
    constructor(message : string) {
        super({
            statusCode : 403,
            title : message,
        });
    }
}