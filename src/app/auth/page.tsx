"use client";
import useGlobalStore from "@/utils/zustand";
import { Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const lato = Lato({ weight: ["700"], subsets: ["latin"] });

function Auth() {
    const {theme} = useGlobalStore();
    // throw new Error("Auth Error")
    return (
        <>
            <div className={`card-title justify-center items-center text-3xl ${lato.className}`}>Welcome, 
            <Link className="navbar-start cursor-pointer" href={"/"}>
                <Image alt="biblio" src={theme === "noir" ? "/logo/dark.svg" : "/logo/light.svg"} height={44} width={100} />
            </Link> Phile</div>
            <div className={`text-xl`}>The Place where you find your next Great Read 📖</div>
            
        </>
    );
}

export default Auth;