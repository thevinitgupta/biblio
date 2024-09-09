import { loggingService } from "@/app/actions/logging";
import { ResponseType, LoggerLevel } from "@/types/enums";
import { ErrorResponse, applicationErrors } from "@/types/errors";
import { z } from "zod";
import { checkError } from "./errorChecker";

export const parseError = (error : any) : ErrorResponse | null => {
    if (error instanceof z.ZodError) {
        console.log("ZOD ERROR : ",error)
        const message = JSON.parse(error.message);
        return { error : "Zod Error",  description: `${message[0].message}`, type: ResponseType.warning };
    }
    const typeOfError: applicationErrors = checkError(error as Error);
    console.log("NOT ZOD : ",typeOfError);
    if (typeOfError === applicationErrors.NETWORK_ERROR) {
        loggingService("Server downtime experienced", LoggerLevel.warn);
        return { error : "Server Down" ,description: `Server not Running`, type: ResponseType.warning };
    }
    else if(typeOfError=== applicationErrors.NO_DATA_ERROR){
        loggingService("Invalid Username", LoggerLevel.error);
        return { error : "No User", description: `User with email Email not found`, type: ResponseType.warning };
    }
    return null;
}