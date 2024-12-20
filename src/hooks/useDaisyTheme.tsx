"use client";
import useGlobalStore from "@/utils/zustand";
import React from "react";
export interface DaisyThemeProviderProps {
    children : React.ReactNode,
}


const DaisyThemeProvider = ({children} : DaisyThemeProviderProps) => {
    const {theme} = useGlobalStore();
    return (
        <div data-theme={theme}>
            {children}
        </div>
    );
}

export default DaisyThemeProvider;
