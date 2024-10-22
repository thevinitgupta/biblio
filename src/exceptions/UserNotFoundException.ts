import Error, { ErrorProps } from "next/error";

export class UserNotFoundException extends Error {
    constructor(message : string) {
        super({
            statusCode : 404,
            title : message,
        });
    }
}