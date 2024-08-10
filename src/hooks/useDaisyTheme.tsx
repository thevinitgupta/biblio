"use client";
import React, { createContext } from "react";

interface DaisyThemeContextProps {
    theme : string,
    setTheme : React.Dispatch<React.SetStateAction<string>>
}

export const DaisyThemeContext = createContext<DaisyThemeContextProps | undefined>(undefined);

export interface DaisyThemeProviderProps {
    children : React.ReactNode,
    applyTheme? : string,
}


const DaisyThemeProvider = ({children, applyTheme = "ivory"} : DaisyThemeProviderProps) => {
    const [theme, setTheme] = React.useState(applyTheme);
    return (
        <DaisyThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </DaisyThemeContext.Provider>
    );
}

export default DaisyThemeProvider;
