import Error, { ErrorProps } from "next/error";

export class AccessDeniedException extends Error {
    constructor(message : string) {
        super({
            statusCode : 403,
            title : message,
        });
    }
}