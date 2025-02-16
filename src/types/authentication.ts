import { z } from "zod";
import { ResponseType } from "./enums";

const SessionDataSchema = z.object({
    iss : z.string().min(4, "Issuer is empty"),
    sub : z.string().min(4, "Subject is empty"),
    username: z.string().email("Invalid Email"),
    authorities : z.string().min(10,"Authorities data missing"),
    iat : z.number().positive(),
    exp : z.number().positive(),
});


export type SessionData = z.infer<typeof SessionDataSchema>;


export type LoginResponseType = {
    message : string,
    token? : string,
    type : ResponseType
}