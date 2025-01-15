"use client";
import useGlobalStore from "@/utils/zustand";
import { Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const lato = Lato({ weight: ["700"], subsets: ["latin"] });

function Auth() {
    const { theme } = useGlobalStore();

    return (
        <>
            <div
                className={`card-title justify-center items-center text-center text-lg sm:text-xl md:text-3xl ${lato.className}`}
            >
                Welcome, 
                <Link className="navbar-start cursor-pointer" href={"/"}>
                    <Image
                        alt="biblio"
                        src={theme === "noir" ? "/logo/dark.svg" : "/logo/light.svg"}
                        height={44}
                        width={100}
                    />
                </Link>{" "}
                Phile
            </div>
            <div className={`text-center text-base sm:text-lg md:text-xl mt-2`}>
                The Place where you find your next Great Read 📖
            </div>
        </>
    );
}

export default Auth;
