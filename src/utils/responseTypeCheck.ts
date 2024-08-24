import { ResponseType } from "../types/enums";

export const checkType  = (loginResponse : string) : ResponseType => {
    if(loginResponse.includes("SUCCESS")) return ResponseType.success;
    else if(loginResponse.includes("WARNING")) return ResponseType.warning;
    else return ResponseType.error;
}