export class PublicKeyException extends Error {
    constructor(message : string) {
        super(message);
        this.name = "PublicKeyException";
    }
}