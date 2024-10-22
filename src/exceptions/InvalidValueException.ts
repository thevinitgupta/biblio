import Error, { ErrorProps } from "next/error";

export class InvalidValueException extends Error {
    constructor(message : string) {
        super({
            statusCode : 400,
            title : message,
        });
    }
}