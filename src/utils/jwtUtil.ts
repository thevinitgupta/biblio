import { SessionData } from "@/types/authentication";
import { decodeJwt } from "jose";

export async function decode(jwtToken : string) : Promise<SessionData | null>{
    try{
        const decoded : SessionData = await decodeJwt(jwtToken);
        if(decoded) return decoded;
    }catch(e){
        console.error(e);
    }
    return null;
}