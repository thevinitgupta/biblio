"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BackgroundImage from "./BackgroundImage";
import { getSession } from "@/utils/sessions";
import { redirect, usePathname } from "next/navigation";
import { cookies } from "next/headers";
import DaisyThemeProvider from "@/hooks/useDaisyTheme";
import useGlobalStore from "@/utils/zustand";

export enum AuthTab {
    LOGIN,
    SIGNUP,
}
const authTabStyle: string = "tab-active bg-accent";

const AuthLayout = ({
    children,
    login,
    signup,
}: {
    children: React.ReactNode;
    login: React.ReactNode;
    signup: React.ReactNode;
}) => {
    const [activeTab, setActiveTab] = useState<AuthTab>(AuthTab.LOGIN);
    const pathname = usePathname();
    const { sessionToken } = useGlobalStore();

    useEffect(() => {
        if (sessionToken) {
            redirect("/dashboard");
        }
    }, []);

    useEffect(()=> {
        console.log("pathname changed")
        if(pathname.includes("login") && activeTab!=AuthTab.LOGIN){
            setActiveTab(AuthTab.LOGIN)
        }
        else if(pathname.includes("signup") && activeTab!=AuthTab.SIGNUP){
            setActiveTab(AuthTab.SIGNUP);
        }
    },
    [pathname])

    return (
        <DaisyThemeProvider>
            <main className="flex h-screen flex-col items-center justify-center px-4 sm:px-8 py-8">
                <BackgroundImage />
                <div
                    className={`card items-center w-full md:max-w-[760px] lg:w-3/5 h-full md:h-4/5 bg-base-100 shadow-xl relative`}
                >
                    <div
                        role="tablist"
                        className="tabs tabs-boxed w-full sm:w-2/3 lg:w-2/5 mx-auto"
                    >
                        <a
                            role="tab"
                            onClick={() => {
                                setActiveTab(AuthTab.LOGIN);
                            }}
                            className={`tab ${
                                activeTab === AuthTab.LOGIN && authTabStyle
                            } text-base sm:text-lg`}
                        >
                            Login
                        </a>
                        <a
                            role="tab"
                            onClick={() => {
                                setActiveTab(AuthTab.SIGNUP);
                            }}
                            className={`tab ${
                                activeTab === AuthTab.SIGNUP && authTabStyle
                            } text-base sm:text-lg`}
                        >
                            Signup
                        </a>
                    </div>
                    <div className="card-body md:max-w-[560px] flex justify-center items-center">
                        {children}
                        {activeTab === AuthTab.LOGIN && login}
                        {activeTab === AuthTab.SIGNUP && signup}
                    </div>
                </div>
            </main>
        </DaisyThemeProvider>
    );
};

export default AuthLayout;
