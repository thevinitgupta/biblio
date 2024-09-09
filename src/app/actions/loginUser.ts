"use server";
import { z } from "zod";
import { LoginFormData, LoginFormSchema } from "../../types/forms";
import { cookies } from "next/headers";
import { checkError } from "@/utils/errorChecker";
import { applicationErrors } from "@/types/errors";
import { LoggerLevel, ResponseType } from "@/types/enums";
import { loggingService } from "./logging";

/* Authorization Header : 'authorization' => {
      name: 'Authorization',
      value: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJCaWJsaW8iLCJzdWIiOiJTZXNzaW9uIFRva2VuIiwidXNlcm5hbWUiOiJ0aGV2aW5pdGd1cHRhQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiZGVsZXRlOmNvbW1lbnQsZGVsZXRlOnVzZXIsdXBkYXRlOmNvbW1lbnQsY3JlYXRlOmNvbW1lbnQscmVhZDpwb3N0LHJlYWQ6Y29tbWVudCx1cGRhdGU6dXNlcixyZWFkOnVzZXIsdXBkYXRlOnBvc3QsY3JlYXRlOnBvc3QsZGVsZXRlOnBvc3QiLCJpYXQiOjE3MjM0MjczNTIsImV4cCI6MTcyMzQ1NzM1Mn0.kJgwkopDbcDNcQcqRbpPb9jHEcCDp4z6_3ZAkt9WcL0'
    },
    */

export const loginUser = async ({
    email, password
} : LoginFormData) => {

    // try {
        // const {email,password} = LoginFormSchema.parse({
        //     email: formData.get("email"),
        //     password: formData.get("password")
        // });

        const basicAuthorizationToken = btoa(`${email}:${password}`)

        const loginResponse = await fetch("http://localhost:8080/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accepts" : "text/plain",
                "Authorization" : `Basic ${basicAuthorizationToken}`
            },
            credentials : "include",
        });
        console.log("LOGIN RESPONSE : ",await loginResponse.text())
        if(loginResponse.status!=200) {
            return new Error("Invalid Credentials");
            // console.log(loginResponse.status);
            // loggingService(`Error logging in user : ${email}`, LoggerLevel.error);
            // return {message : `Error logging in user : ${email}`, token : null, type : ResponseType.error};
        }

        console.log(loginResponse.headers);
        const token : string = loginResponse.headers.get('Authorization') || ''; 
        // cookies().set('biblio-session', token , {
        //     expires : new Date(Date.now() + 10*1000*60*60),
        //     sameSite : "strict",
        //     path : "*",

        // });
        // revalidatePath("/auth", 'layout');
        return {message : `Login Successful`, token, type : ResponseType.success};

    // } catch (error) {
        
    //     if (error instanceof z.ZodError) {
    //         console.log("Zod Error :", error.issues)
    //         const message = JSON.parse(error.message);
    //         return {message : `${message[0].message}`, responseType : ResponseType.warning};
    //       }
    //     const typeOfError : applicationErrors =  checkError(error as Error);
    //     console.log(typeOfError);
    //     if(typeOfError===applicationErrors.NETWORK_ERROR){
    //         loggingService("Server downtime experienced", LoggerLevel.warn);
    //         return {message : `Server not Running`, responseType : ResponseType.warning};
    //     }
    //     loggingService(`Unrecognised User trying to access`, LoggerLevel.warn);
    //     return {message : `${ error instanceof Error  && error.message.length>0 ? error.message : "Invalid User Credentials"}`, responseType : ResponseType.error};
    // }

}
