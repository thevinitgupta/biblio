import { create } from "zustand";
import { SessionSlice, createSessionSlice } from "./sessionStore";
import { ThemeSlice, createThemeSlice } from "./themeStore";
import { UserSlice, createUserSlice } from "./userStore";
import { KeySlice, createKeySlice } from "./keyStore";

const useGlobalStore = create<SessionSlice & ThemeSlice & UserSlice & KeySlice>()(
    (...a) => ({
        ...createSessionSlice(...a),
        ...createThemeSlice(...a),
        ...createUserSlice(...a),
        ...createKeySlice(...a),
    })
)

export default useGlobalStore;