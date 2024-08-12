"use client";

import { loginUser } from "@/app/actions/loginUser";
import { useLogin } from "@/hooks/useLogin";
import { useEffect, useState } from "react";
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

    // const handleLogin = (e : React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     console.log("Login button clicked");
    //     useLogin({email,password});
    // }

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
                <div className="join">
                <label className="input input-bordered flex items-center gap-2 w-full">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg> */}
                        <input type="password" placeholder="password" className="grow join-item" name="password" />
                    </label>
                    <label className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" />

                            {/* sun icon */}
                            <svg
                                className="swap-on h-4 w-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-off h-4 w-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </div>
                <Button.Primary message="Signup" loadingMessage="Registering" />
                {state.message && showAlert && <Alert.Default message={state.message} type={alertType} />}            </form>
        </>
    );
}

export default Login;
