"use client"

import useLogout from "@/hooks/useLogout";
import { ResponseType } from "@/types/enums";
import { ErrorResponse } from "@/types/errors";
import { parseServerError } from "@/utils/errorParser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import ProfileImage from "./ProfileImage";
import useGlobalStore from "@/utils/zustand";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { FiUserPlus } from "react-icons/fi";

const Navbar = () => {
    const { mutate: logout_user, isError, isPending } = useLogout();
    const { sessionToken, theme, setTheme} = useGlobalStore();
    const [logoutError, setLogoutError] = useState({
        error: "",
        description: "",
        type: ResponseType.none
    } as ErrorResponse);
    const router = useRouter();
    const pathname = usePathname();


    const toggleTheme = () => {
        if(theme==="noir"){
            setTheme("ivory");
        }
        else setTheme("noir")
    }

    
    const handleLogout = () => {
        logout_user(undefined, {
            onSuccess: () => {
                router.push("/auth")
            },
            onError: (logout_error) => {
                const parsedError = parseServerError(logout_error);
                setLogoutError(parsedError);
            }
        });
    }
    return (
        <nav className={pathname.startsWith("/auth") ? "hidden" : "navbar bg-base-200 w-full md:w-[90%] mx-auto mb-5 px-5 py-4 sticky top-5 z-40 rounded-xl"}>
            {/* <div className="navbar-start md:hidden">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
            </div> */}
            <div className="navbar-start cursor-pointer" onClick={() => { router.push("/") }}>
                <Image alt="biblio" src={theme === "noir" ? "/logo/dark.svg" : "/logo/light.svg"} height={44} width={100} />
            </div>


            <div className="navbar-center w-3/5 hidden md:flex flex-row justify-evenly">



                <Link className="flex items-center gap-2 text-lg" href="/create">
                    
                    Create New
                    <MdOutlinePostAdd height={20} width={20} />
                </Link>

                <Link className="flex items-center gap-2 text-lg" href={"/post"}>
                    
                    Feed
                    <GrArticle height={20} width={20} />
                </Link>
                {
                    !sessionToken && <Link href={"/auth"} className="flex items-center gap-2 text-lg">
                    Login 
                    <FiUserPlus />
                     </Link>
                }

                {pathname.startsWith("/dashboard") &&
                        
                        <div onClick={handleLogout} className={`flex gap-2 items-center text-lg cursor-pointer`}>
                            Logout <IoLogOutOutline height={20} width={20} />

                        </div>

                }
            </div>
                
            <div className="navbar-center md:navbar-end gap-5">
            <input  type="checkbox" defaultChecked className="toggle h-3 md:h-6 w-6 md:w-12  border-primary bg-base-200 checked:bg-primary checked:text-primary checked:border-primary text-primary" 
            onClick={()=> toggleTheme()}
            />
           {sessionToken && <Link href={"/dashboard"} className="">
           <ProfileImage /> 
            </Link>}
            </div>    

            {
                isError && logoutError.type === ResponseType.error &&
                <Alert.Error message={logoutError.description} />
            }
            {
                isError && logoutError.type === ResponseType.warning &&
                <Alert.Warning message={logoutError.description} />
            }
        </nav>
    );
}

export default Navbar;