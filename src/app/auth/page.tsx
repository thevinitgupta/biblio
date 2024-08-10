import { Lato } from "next/font/google";
import React, { ReactNode } from "react";

const lato = Lato({ weight: ["700"], subsets: ["latin"] });

function Auth() {
    // throw new Error("Auth Error")
    return (
        <>
            <div className={`card-title justify-center text-3xl ${lato.className}`}>Welcome, Biblio Phile</div>
            <div className={`text-xl`}>The Place where you find your next Great Read 📖</div>
            
        </>
    );
}

export default Auth;