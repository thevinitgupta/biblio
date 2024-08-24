"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BackgroundImage from "./BackgroundImage";
import { getSession } from "@/utils/sessions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export enum AuthTab  {
    LOGIN,
    SIGNUP
}
const authTabStyle : string = "tab-active  bg-accent";
const AuthLayout = ({ children, login, signup }: {
    children: React.ReactNode
    login: React.ReactNode,
    signup: React.ReactNode,
}) => {
    const [activeTab, setActiveTab] = useState<AuthTab>(AuthTab.LOGIN);

    return (
        <main className="flex h-screen flex-col items-center justify-center px-16 py-8">
            <BackgroundImage />
            <div className={`card w-3/5 h-4/5 bg-base-100 shadow-xl relative`}>
                <div role="tablist" className="tabs tabs-boxed w-2/5 mx-auto">
                    <a role="tab" onClick={() => {
                        setActiveTab(AuthTab.LOGIN);
                    }} className={`tab ${activeTab===AuthTab.LOGIN && authTabStyle} text-xl`}>Login</a>
                    <a role="tab" onClick={() => {
                        setActiveTab(AuthTab.SIGNUP);
                    }} className={`tab ${activeTab===AuthTab.SIGNUP && authTabStyle} text-xl`}>Signup</a>
                </div>
                <div className="card-body justify-center items-center">
                    {children}
                    {activeTab===AuthTab.LOGIN && login}
                    {activeTab===AuthTab.SIGNUP && signup}
                </div>
            </div>
        </main>
    );
}

export default AuthLayout;