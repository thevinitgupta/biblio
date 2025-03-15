import {StateCreator, create} from "zustand";

// export type SessionState = {
//     sessionToken : string;
// }

// export type SessionActions = {
//     setSession : (session : string) => void;
//     deleteSession : () => void;
// }

export interface SessionUser{
    firstName : string,
    lastName : string,
    email : string,
    id : string,
}

const sessionUserDefault : SessionUser = {
    firstName : "",
    lastName : "",
    email : "",
    id : "",
}

export interface UserSlice {
    user: SessionUser;
    setUser : (user : SessionUser) => void;
    deleteUser : () => void;
}
export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = 
(set => ({
    user : sessionUserDefault,
    setUser : (user : SessionUser) => set((state) => {
        state.user = user;
        return state;
    }),
    deleteUser : () => set((state) => {
        state.user = sessionUserDefault;
        return state;
    }),
}))