import { StateCreator, create } from "zustand";


export type Theme = "noir" | "ivory";
export interface ThemeSlice {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}


export const createThemeSlice : StateCreator<ThemeSlice, [], [], ThemeSlice> = (
    (set) => ({
        theme: "noir",
        setTheme: (theme: Theme) => set({ theme }),
    })
)
