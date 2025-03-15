import { create } from "zustand";
import { SessionSlice, createSessionSlice } from "./sessionStore";
import { ThemeSlice, createThemeSlice } from "./themeStore";
import { UserSlice, createUserSlice } from "./userStore";

const useGlobalStore = create<SessionSlice & ThemeSlice & UserSlice>()(
    (...a) => ({
        ...createSessionSlice(...a),
        ...createThemeSlice(...a),
        ...createUserSlice(...a),
    })
)

export default useGlobalStore;