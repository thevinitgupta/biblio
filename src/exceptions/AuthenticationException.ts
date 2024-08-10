import Error, { ErrorProps } from "next/error";

export class AuthenticationException extends Error {
    constructor(message : string) {
        super({
            statusCode : 401,
            title : message,
        });
    }
}