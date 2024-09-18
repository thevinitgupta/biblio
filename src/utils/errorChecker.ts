import {applicationErrors} from "../types/errors";

export const checkError : (error : Error) => applicationErrors = (error) => {
    let errorType : applicationErrors = applicationErrors.UNKNOWN_ERROR;
    if (error.message.toLowerCase().includes('fetch failed') || error.message.toLowerCase().includes('network error')) {
        errorType = applicationErrors.NETWORK_ERROR;
    } else if (error.message.includes('HTTP error')) {
        errorType = applicationErrors.HTTP_ERROR;
    } else if (error.message.includes('Permission Denied')) {
        errorType = applicationErrors.NO_PERMISSION_ERROR;
    } else if (error.message.includes('No User')) {
        errorType = applicationErrors.NO_DATA_ERROR;
    } 
    return errorType;
}