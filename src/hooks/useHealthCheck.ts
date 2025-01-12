"use client"
import { useEffect, useState } from "react";

export interface HealthCheckResponseI{
    ok : boolean;
    reason : string;
    loading : boolean
}
const useHealthCheck = (check = true ) => {
    const [healthCheckResponse, setHealthCheckResponse] = useState<HealthCheckResponseI>({
        ok: false,
        reason: "",
        loading: true,
    });
    useEffect(()=> {
        const checkHealth = async () => {
            try {
            const response = await fetch("http://localhost:8080/health", {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain",
                    },
            });
            console.log(response,await response.text())
            if(response.status===200) {
                setHealthCheckResponse({
                    ok : true,
                    reason : "",
                    loading : false
                })
            }
            else if(response.status===403 || response.status===401){
                console.log("Please Check Permissions")
            }
            }catch(error) {
                if(error instanceof Error)
                console.log("error : ",error, error.message);
                else console.log("something Went Wrong!")
                setHealthCheckResponse({
                    ok : false,
                    reason : error instanceof Error ?  error.message : "Something Went Wrong!",
                    loading : false
                });
            }
        };
        if(check) checkHealth();
        else {
            setHealthCheckResponse({
                ok : true,
                reason : "",
                loading : false
            });
        }
    },[])
    return healthCheckResponse;
}

export default useHealthCheck;