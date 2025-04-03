"use client";

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

enum navbar_items {
    create = "Create New",
    feed = "Feed",
    login = "Login",
    logout = "Logout",
    home = "Home"
}

const ResponsiveNavbar = () => {
    const { mutate: logout_user, isError, isPending } = useLogout();
    const [active, setActive] = useState<navbar_items>();
    const { sessionToken, theme, setTheme } = useGlobalStore();
    const [logoutError, setLogoutError] = useState({
        error: "",
        description: "",
        type: ResponseType.none
    } as ErrorResponse);
    const router = useRouter();
    const pathname = usePathname();

    const toggleTheme = () => {
        setTheme(theme === "noir" ? "ivory" : "noir");
    };

    const handleLogout = () => {
        logout_user(undefined, {
            onSuccess: () => {
                router.push("/auth");
            },
            onError: (logout_error) => {
                const parsedError = parseServerError(logout_error);
                setLogoutError(parsedError);
            }
        });
    };

    useEffect(() => {
        if (pathname.includes("/create")) {
            setActive(navbar_items.create);
        } else if (pathname.includes("/post")) {
            setActive(navbar_items.feed);
        } else if (pathname.includes("/auth")) {
            setActive(navbar_items.login);
        } else {
            setActive(navbar_items.home);
        }
    }, [pathname]);

    return (
        <nav className={pathname.startsWith("/auth") ? "hidden" : "navbar bg-base-200 w-[95vw] md:w-[90%] mx-0 md:mx-auto mb-5 px-5 py-4 sticky top-5 z-40 rounded-xl shadow-md"}>
            {/* Mobile Menu (Hamburger + Dropdown) */}
            <div className="navbar-start md:hidden">
                <div className="dropdown">
                    <button tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link href="/create">Create New</Link>
                        </li>
                        <li>
                            <Link href="/post">Feed</Link>
                        </li>
                        {!sessionToken && (
                            <li>
                                <Link href="/auth">Login</Link>
                            </li>
                        )}
                        {pathname.startsWith("/dashboard") && (
                            <li>
                                <button onClick={handleLogout} className="flex items-center gap-2">
                                    Logout <IoLogOutOutline />
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Logo Section */}
            <div className="navbar-start flex cursor-pointer" onClick={() => router.push("/")}>
                <Image
                    alt="biblio"
                    src={theme === "noir" ? "/logo/dark.svg" : "/logo/light.svg"}
                    height={44}
                    width={100}
                />
            </div>

            {/* Center Links (Desktop) */}
            <div className="navbar-center hidden md:flex flex-row justify-evenly w-3/5">
                <Link className={`flex items-center gap-2 text-lg 
                ${active === navbar_items.create ? "opacity-100" : "opacity-60"}
                `} href="/create">
                    Create New <MdOutlinePostAdd />
                </Link>
                <Link className={`flex items-center gap-2 text-lg 
                ${active === navbar_items.feed ? "opacity-100" : "opacity-60"}`} href="/post">
                    Feed <GrArticle />
                </Link>
                {!sessionToken && (
                    <Link className={`flex items-center gap-2 text-lg
                    ${active === navbar_items.login ? "opacity-100" : "opacity-60"}`} href="/auth">
                        Login <FiUserPlus />
                    </Link>
                )}
                {pathname.startsWith("/dashboard") && (
                    <button
                        onClick={handleLogout}
                        className="flex gap-2 items-center text-lg cursor-pointer"
                    >
                        Logout <IoLogOutOutline />
                    </button>
                )}
            </div>

            {/* Right Section */}
            <div className="navbar-end flex gap-5 items-center">
                <input
                    type="checkbox"
                    defaultChecked
                    className="toggle h-6 w-12 border-primary bg-base-200 checked:bg-primary text-primary"
                    onClick={toggleTheme}
                />
                {sessionToken && (
                    <Link href="/dashboard">
                        <ProfileImage />
                    </Link>
                )}
            </div>

            {/* Error Alerts */}
            {isError && logoutError.type === ResponseType.error && (
                <Alert.Error message={logoutError.description} />
            )}
            {isError && logoutError.type === ResponseType.warning && (
                <Alert.Warning message={logoutError.description} />
            )}
        </nav>
    );
};

export default ResponsiveNavbar;