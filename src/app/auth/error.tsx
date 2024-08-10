"use client"
import Error from "next/error";
import { Lato } from "next/font/google";
const lato = Lato({ weight : ["700"], subsets: ["latin"] });


function AuthError({
    error,
    reset
} : {
    error : Error & {digest ? : string},
    reset : () => void
}) {
    return (
        <div className="card-body">
                <h2 className={`card-title justify-center text-3xl ${lato.className}`}>Sorry, Biblio Phile</h2>
                <p>Seems there is an Issue with getting you in!</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
    );
}

export default AuthError;