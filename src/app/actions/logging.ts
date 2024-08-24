"use server";
import getLogger from "@/services/logger.server";
import { LoggerLevel } from "@/types/enums";



export async function loggingService(message : string, type :LoggerLevel ){
    // console.log("Logger Server Action Called : ")
    const logger = getLogger();
    if(type===LoggerLevel.error){
        const errorMessage = 'Client Error : '+message;
        logger.error(errorMessage);
    }
    else if(type===LoggerLevel.warn){
        const warningMessage = 'Client Warning : '+message;
        logger.warn(warningMessage)
    }
    else {
        logger.info(message);
    }
}