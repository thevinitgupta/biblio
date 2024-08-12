"use client";

import { registerUser } from "@/app/actions/register";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
    message: ""
};



const checkType  = (loginResponse : string) : ResponseType => {
    if(loginResponse.includes("SUCCESS")) return ResponseType.success;
    else if(loginResponse.includes("WARNING")) return ResponseType.warning;
    else return ResponseType.error;
}

function Signup() {
    const [state, formAction] = useFormState(registerUser, initialState);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<ResponseType>(ResponseType.none);
    // const [loading,setLoading] = useState<boolean>(false)

    useEffect(() => {
        setShowAlert(true);
        if (state.message!="") {
            setAlertType(checkType(state.message));
            state.message = state.message.split("|").toSpliced(-1,1).join(" ");
          const timer = setTimeout(() => {
            setShowAlert(false);
          }, 3500); // Set delay time in milliseconds

          return () => clearTimeout(timer);
        }
      }, [state]);
    return (
        <>

            <form className="card-actions flex-col justify-center items-center gap-5 mt-5" action={formAction}>
                <label className="input input-bordered flex items-center gap-2">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg> */}
                    <input type="text" className="grow" placeholder="Email" name="email" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                    <input type="text" className="grow" placeholder="Full Name" name="name" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg> */}
                    <input type="password" className="grow" placeholder="Password" name="password" />
                </label>
                <Button.Primary message="Signup" loadingMessage="Registering" />
                {state.message && showAlert && <Alert.Default message={state.message} type={alertType} />}
            </form>
        </>
    );
}

export default Signup
