import Error, { ErrorProps } from "next/error";

export class NotFoundException extends Error {
    constructor(message : string) {
        super({
            statusCode : 404,
            title : message,
        });
    }
}