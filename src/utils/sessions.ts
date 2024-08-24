
import { SessionData } from "@/types/authentication";
import { decodeJwt, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";



export async function getSession(){
    const session = cookies().get('biblio-session')?.value;
    if(!session) return null;
    return session;
}

export async function updateSession(request : NextRequest){
    const session = request.cookies.get('biblio-session')?.value;
    if(!session) return;



}