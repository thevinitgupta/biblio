"use server";
import { z } from "zod";
import { LoginFormData, LoginFormSchema } from "../../../types/forms";

/* Authorization Header : 'authorization' => {
      name: 'Authorization',
      value: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJCaWJsaW8iLCJzdWIiOiJTZXNzaW9uIFRva2VuIiwidXNlcm5hbWUiOiJ0aGV2aW5pdGd1cHRhQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiZGVsZXRlOmNvbW1lbnQsZGVsZXRlOnVzZXIsdXBkYXRlOmNvbW1lbnQsY3JlYXRlOmNvbW1lbnQscmVhZDpwb3N0LHJlYWQ6Y29tbWVudCx1cGRhdGU6dXNlcixyZWFkOnVzZXIsdXBkYXRlOnBvc3QsY3JlYXRlOnBvc3QsZGVsZXRlOnBvc3QiLCJpYXQiOjE3MjM0MjczNTIsImV4cCI6MTcyMzQ1NzM1Mn0.kJgwkopDbcDNcQcqRbpPb9jHEcCDp4z6_3ZAkt9WcL0'
    },
    

export const loginUser = async (prevState : any, formData : FormData) => {

    try {
        const {email,password} = LoginFormSchema.parse({
            email: formData.get("email"),
            password: formData.get("password")
        });

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
        if(!loginResponse.ok) throw new Error(await loginResponse.text());

        return {message : `${await loginResponse.text()}|SUCCESS`};

    } catch (error) {
        if (error instanceof z.ZodError) {
            const message = JSON.parse(error.message);
            return {message : `${message[0].message}|WARNING`};
          }
        console.log(error);
        return {message : `${ error instanceof Error  && error.message.length>0 ? error.message : "Invalid User Credentials"}|FAILURE`};
    }

}
