"use client"

import { Lato } from "next/font/google";
import { loggingService } from "../actions/logging";
import { LoggerLevel } from "@/types/enums";
const lato = Lato({ weight : ["700"], subsets: ["latin"] });


function DashboardError({
    error,
    reset
} : {
    error : Error,
    reset : () => void
}) {
    console.log("Profile Page Error boundary")
    loggingService(error.message, LoggerLevel.error);

    return (
        <div className="card-body justify-center items-center flex-grow-0">
                {/* <h2 className={`card-title justify-center text-3xl ${lato.className}`}>Sorry, Biblio Phile</h2> */}
                <p className={`justify-center text-xl ${lato.className} text-red-400`}>Seems there is an Issue with getting your Data</p>
                <div className="card-actions">
                    <button onClick={reset} className="btn btn-accent">Try Again</button>
                </div>
            </div>
    );
}

export default DashboardError;