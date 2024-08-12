"use server";
import { fetchWithHeaders } from "@/utils/addHeaders";
import { separateName } from "@/utils/stringUtils";
import { ZodError, ZodErrorMap, ZodFormattedError, z } from "zod";


// export interface LoginFormData {
//     email : string,
//     password : string
// }

enum ResponseType{
    'SUCCESS',
    'FAILURE',
    'WARNING'
}

export const loginUser = async (prevState : any, formData : ) => {
    const formSchema = z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters"),
    });
    try {
        const {email,password} = formSchema.parse({
            email: formData.get("email"),
            password: formData.get("password")
        });

        const loginResponse = await fetchWithHeaders("http://localhost:8080/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accepts" : "text/plain"
            },
            credentials : "include",
        });
        if(!loginResponse.ok) throw new Error(await loginResponse.text());
        // const data = await loginResponse.json();
        return {message : `${await loginResponse.text()}|SUCCESS`};
        // useloginResponse = loginResponse;
    } catch (error) {
        if (error instanceof z.ZodError) {
            const message = JSON.parse(error.message);
            return {message : `${message[0].message}|WARNING`};
          }
        console.log(error);
        return {message : {message : `${ error instanceof Error  && error.message.length>0 ? error.message : "Invalid User Credentials"}|FAILURE`}};
    }

}
