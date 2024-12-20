import { create } from "zustand";
import { SessionSlice, createSessionSlice } from "./sessionStore";
import { ThemeSlice, createThemeSlice } from "./themeStore";

const useGlobalStore = create<SessionSlice & ThemeSlice>()(
    (...a) => ({
        ...createSessionSlice(...a),
        ...createThemeSlice(...a),
    })
)

export default useGlobalStore;