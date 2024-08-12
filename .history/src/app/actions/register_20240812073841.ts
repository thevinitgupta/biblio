"use server";
import { AuthenticationException } from "@/exceptions/AuthenticationException";
import { separateName } from "@/utils/stringUtils";
import { ZodError, ZodErrorMap, ZodFormattedError, z } from "zod";
import { SignupFormSchema } from "../../../types/forms";


export const registerUser = async (prevState : any, formData : FormData) => {

    try {
        const {email,password,name} = SignupFormSchema.parse({
            email: formData.get("email"),
            name: formData.get("name"),
            password: formData.get("password")
        });

        const {firstName, lastName} = separateName(name);
        const signupResponse = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts" : "text/plain"
            },
            // credentials : "include",
            body : JSON.stringify({email,firstName,lastName,password})
        });
        console.log(signupResponse)
        if(!signupResponse.ok) {
            console.log("NOT OK")
            throw new Error(await signupResponse.text());
        }
        // const data = await loginResponse.json();
        return {message : `${await signupResponse.text()}|SUCCESS`};
        // useSignupResponse = signupResponse;
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {

            const message = JSON.parse(error.message);
            return {message : `${message[0].message}|WARNING`};
        }
        console.log("NOT ZOD ERROR : ",error);
        return {message : `${ error instanceof Error  && error.message.length>0 ? error.message : "Could Not Register. Try Again"}|FAILURE`};
    }

}
