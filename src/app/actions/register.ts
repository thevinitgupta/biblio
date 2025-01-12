// "use server";
// import { AuthenticationException } from "@/exceptions/AuthenticationException";
// import { separateName } from "@/utils/stringUtils";
// import { ZodError, ZodErrorMap, ZodFormattedError, ZodIssue, z } from "zod";
// import { SignupFormSchema } from "../../types/forms";
// import { ResponseType } from "@/types/enums";
// import { applicationErrors } from "@/types/errors";
// import { checkError } from "@/utils/errorChecker";


// export const registerUser = async (prevState : any, formData : FormData) => {

//     try {
//         const {email,password,name} = SignupFormSchema.parse({
//             email: formData.get("email"),
//             name: formData.get("name"),
//             password: formData.get("password")
//         });

//         const {firstName, lastName} = separateName(name);
//         const signupResponse = await fetch("http://localhost:8080/auth/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accepts" : "text/plain"
//             },
//             // credentials : "include",
//             body : JSON.stringify({email,firstName,lastName,password})
//         });
//         console.log(signupResponse)
//         if(!signupResponse.ok) {
//             console.log("NOT OK")
//             throw new Error(await signupResponse.text());
//         }
//         // const data = await loginResponse.json();
//         return {message : `${await signupResponse.text()}`,responseType : ResponseType.success};
//         // useSignupResponse = signupResponse;
//     } catch (error) {
//         console.log(error);
//         if (error instanceof z.ZodError) {
//             console.log("Zod Errors : ", error.issues);
//             let message = error.issues[0].message;
//             console.log(message)
//             return {message : `${message}`, responseType : ResponseType.warning};
//         }
//         console.log("NOT ZOD ERROR : ",error);
//         const typeOfError : applicationErrors =  checkError(error as Error);
//         console.log(typeOfError);
//         if(typeOfError===applicationErrors.NETWORK_ERROR){
//             return {message : `Server not Running`, responseType : ResponseType.warning};
//         }
//         return {message : `${ error instanceof Error  && error.message.length>0 ? error.message : "Could Not Register. Try Again"}`, responseType : ResponseType.error};
//     }

// }
