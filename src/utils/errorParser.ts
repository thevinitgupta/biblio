import { loggingService } from "@/app/actions/logging";
import { ResponseType, LoggerLevel } from "@/types/enums";
import { ErrorResponse, ServerErrorResponseType, applicationErrors } from "@/types/errors";
import { z } from "zod";
import { checkError } from "./errorChecker";

export const parseError = (error : any) : ErrorResponse | null => {
    if (error instanceof z.ZodError) {
        const message = JSON.parse(error.message);
        return { error : "Zod Error",  description: `${message[0].message}`, type: ResponseType.warning };
    }
    const typeOfError: applicationErrors = checkError(error as Error);
    if (typeOfError === applicationErrors.NETWORK_ERROR) {
        loggingService("Server downtime experienced", LoggerLevel.warn);
        return { error : "Server Down" ,description: `Server not Running`, type: ResponseType.warning };
    }
    
    return null;
}

export const parseServerError = (error : any) : ErrorResponse => {
    const serverError = error as ServerErrorResponseType;
    if([403].includes(parseInt(serverError.status))){
        loggingService("User unauthorized to proceed", LoggerLevel.error);
        return { error : "Unauthorized Access" ,description: "Please login to proceed" , type: ResponseType.error };
    }
    if([401,400].includes(parseInt(serverError.status))){
        loggingService(serverError.response.data.description, LoggerLevel.error);
        return { error : serverError.response.data.error ,description: serverError.response.data.description , type: ResponseType.error };
    }
    else if ([404,500].includes(parseInt(serverError.status))){
        loggingService(serverError.response.data.description, LoggerLevel.error);
        return { error : serverError.response.data.error ,description: serverError.response.data.description , type: ResponseType.warning };
    }
    
    else {
        loggingService("Server Error :"+serverError.response.data.description, LoggerLevel.error);
        return { error : "Server Error" ,
        description: "Something unexpected happened :"+serverError.response.data.description === null ? "" : serverError.response.data.description , 
        type: ResponseType.error };
    }
}