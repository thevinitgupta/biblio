"use server";
import { AuthenticationException } from "@/exceptions/AuthenticationException";
import { separateName } from "@/utils/stringUtils";
import { ZodError, ZodErrorMap, ZodFormattedError, z } from "zod";


export interface SignupFormData {
    email : string,
    name : string,
    password : string
}

enum ResponseType{
    'SUCCESS',
    'FAILURE',
    'WARNING'
}

export const registerUser = async (prevState : any, formData : FormData) => {
    const formSchema = z.object({
        email: z.string().email("Invalid email"),
        name: z.string().min(3, "Name must be at least 3 characters"),
        password: z.string().min(8, "Password must be at least 8 characters"),
    });
    try {
        const {email,password,name} = formSchema.parse({
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