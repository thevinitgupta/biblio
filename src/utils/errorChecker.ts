import {applicationErrors} from "../types/errors";

export const checkError : (error : Error) => applicationErrors = (error) => {
    let errorType : applicationErrors = applicationErrors.UNKNOWN_ERROR;
    if (error.message.toLowerCase().includes('fetch failed')) {
        errorType = applicationErrors.NETWORK_ERROR;
    } else if (error.message.includes('HTTP error')) {
        errorType = applicationErrors.HTTP_ERROR;
    } else if (error.message.includes('Permission Denied')) {
        errorType = applicationErrors.NO_PERMISSION_ERROR;
    } 
    return errorType;
}