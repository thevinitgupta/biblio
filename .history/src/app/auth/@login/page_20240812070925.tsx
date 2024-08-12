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
                const [passwordType, setPasswordType] = useState<"password" | "text">("password");

    const togglePasswordView = () => {
        if(passwordType==="password") setPasswordType("text");
        else setPasswordType("password");
    }
                <Button.Primary message="Login" loadingMessage="Logging in" />
                {state.message && showAlert && <Alert.Default message={state.message} type={alertType} />}            </form>
        </>
    );
}

export default Login;
