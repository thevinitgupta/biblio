"use client";

import { loginUser } from "@/app/actions/loginUser";
import { useLogin } from "@/hooks/useLogin";
import { FC, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ResponseType } from "../../../../types/enums";
import Alert from "@/components/Alert";
import Button from "@/components/Button";

const initialState = {
    message: ""
};

const checkType = (loginResponse: string): ResponseType => {
    if (loginResponse.includes("SUCCESS")) return ResponseType.success;
    else if (loginResponse.includes("WARNING")) return ResponseType.warning;
    else return ResponseType.error;
}


function Login() {
    const [state, formAction] = useFormState(loginUser, initialState);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<ResponseType>(ResponseType.none);
    const [passwordType, setPasswordType] = useState<"password" | "text">("password");

    const togglePasswordView = () => {
        if(passwordType==="password") setPasswordType("text");
        else setPasswordType("password");
        console.log("Toggled Password : ",passwordType)
    }

    useEffect(() => {
        setShowAlert(true);
        if (state.message != "") {
            setAlertType(checkType(state.message));
            state.message = state.message.split("|").toSpliced(-1, 1).join(" ");
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3500); // Set delay time in milliseconds

            return () => clearTimeout(timer);
        }
    }, [state]);

    return (
        <>
            <form className="card-actions flex-col justify-center items-start gap-5 mt-5" action={formAction}>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg> */}
                    <input type="text" className="grow" placeholder="Email" name="email" />
                </label>
                <div className="join input input-bordered w-full gap-2">
                    <label className="outline-none flex items-center gap-2">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg> */}
                        <input type={passwordType==="password" ? "password" : "text"} placeholder="password" className="grow join-item" name="password" />
                    </label>
                    <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onClick={() => {togglePasswordView()}} />

                        {/* sun icon */}

                        <svg className="swap-on h-4 w-4 fill-none size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        {/* moon icon */}
                        <svg className="swap-off h-4 w-4 fill-none size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>

                    </label>
                </div>
                <Button.Primary message="Signup" loadingMessage="Registering" />
                {state.message && showAlert && <Alert.Default message={state.message} type={alertType} />}            </form>
        </>
    );
}

export default Login;
