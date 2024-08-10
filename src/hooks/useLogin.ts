"use client";
import { fetchWithHeaders } from "@/utils/addHeaders";
import { useEffect, useState } from "react";

export interface LoginProps {
    email : string,
    password : string
}

export const useLogin = ({email, password} : LoginProps) => {
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [token, setToken] = useState(null);
    let useLoginResponse :any = null;
    
    window.sessionStorage.setItem('userdetails', JSON.stringify({email, password}));
    // useEffect(() => {
        const loginUser = async () => {
            try {
                const loginResponse = await fetchWithHeaders("http://localhost:8080/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accepts" : "text/plain"
                    },
                });
                console.log("Login Response Direct : ",loginResponse);
                // const data = await loginResponse.json();
                console.log(await loginResponse.text())
                useLoginResponse = loginResponse;
            } catch (error) {
                console.log(error);
            }
        }
        loginUser();
    // });
    return useLoginResponse;
}