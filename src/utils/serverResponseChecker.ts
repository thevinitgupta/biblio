import { loggingService } from "@/app/actions/logging";
import { ServerResponseType } from "@/types/common";
import { LoggerLevel, ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";

const checkServerResponse = async (serverResponse : Response, 
    initialResponseData : {message :string, type : ResponseType} & any) : Promise<ServerResponseType> => {
        let errorMessage : string | null = null;
        try {
            const errorResponseJson : ErrorResponse = await serverResponse.json();
            errorMessage = errorResponseJson?.description;
            console.log("server response checker :",errorMessage)
        } catch (error) {
            errorMessage = null;
        }

    if(serverResponse.status===404) {
        loggingService(`Not Found : `, LoggerLevel.warn);
        return {...initialResponseData, message : errorMessage || "Not Found", type : ResponseType.warning};
    }
    else if(serverResponse.status===401) {
        loggingService(`Invalid Authentication Credentials for user :`, LoggerLevel.warn);
        return {...initialResponseData, message : errorMessage || `Invalid Credentials, login again`, type : ResponseType.warning};
    }
    else if(serverResponse.status===403) {
        loggingService(`Unauthorized Access by user : `, LoggerLevel.warn);
        return {...initialResponseData, message :errorMessage || `Not Authorized to access`, type : ResponseType.error};
    }
    else {
        loggingService(`Error : `, LoggerLevel.warn);
        return {message : errorMessage || `Something went wrong, please try again.`, type : ResponseType.error};
    }

}

export default checkServerResponse;