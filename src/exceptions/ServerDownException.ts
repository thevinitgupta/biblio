import Error, { ErrorProps } from "next/error";

export class ServerDownException extends Error {
    constructor(message : string) {
        super({
            statusCode : 500,
            title : message,
        });
    }
}