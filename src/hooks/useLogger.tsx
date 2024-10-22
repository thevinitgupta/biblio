"use client";

import { loggingService } from "@/app/actions/logging";
import { LoggerLevel } from "@/types/enums";
import { useEffect } from "react";

const useLogger = (message : string, type : LoggerLevel) => {
  useEffect(()=> {
    loggingService(message, type);
  }, [message, type]);
}

export default useLogger