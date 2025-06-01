import { StateCreator } from "zustand";


export interface KeySlice {
    publicKey : string,
    setPublicKey : (key : string) => void;
    deletePublicKey : () => void;
    privateKey : string,
    setPrivateKey : (key : string) => void;
    deletePrivateKey : () => void;
}

export const createKeySlice: StateCreator<KeySlice, [], [], KeySlice> = 
(set => ({
    publicKey : "",
    setPublicKey : (key : string) => set((state) => {
        state.publicKey = key;
        return state;
    }),
    deletePublicKey : () => set((state) => {
        state.publicKey = "";
        return state;
    }),
    privateKey : "",
    setPrivateKey : (key : string) => set((state) => {
        state.privateKey = key;
        return state;
    }),
    deletePrivateKey : () => set((state) => {
        state.privateKey = "";
        return state;
    }),
}))