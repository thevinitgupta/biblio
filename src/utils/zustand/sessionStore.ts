import {StateCreator, create} from "zustand";

// export type SessionState = {
//     sessionToken : string;
// }

// export type SessionActions = {
//     setSession : (session : string) => void;
//     deleteSession : () => void;
// }

export interface SessionSlice {
    sessionToken: string;
    setSession : (session : string) => void;
    deleteSession : () => void;
}
export const createSessionSlice: StateCreator<SessionSlice, [], [], SessionSlice> = 
(set => ({
    sessionToken : "",
    setSession : (session : string) => set((state) => {
        state.sessionToken = session;
        return state;
    }),
    deleteSession : () => set((state) => {
        state.sessionToken = "";
        return state;
    }),
}))