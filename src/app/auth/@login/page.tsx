"use client";

import { loginUser } from "@/app/actions/loginUser";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { LoggerLevel, ResponseType } from "../../../types/enums";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/PasswordInput";
import { loggingService } from "@/app/actions/logging";

const initialState = {
    message: "",
    token : "",
    responseType : ResponseType.none
};

function Login() {
    const [state, formAction] = useFormState(loginUser, initialState);
    const router = useRouter();

    

    useEffect(() => {
        let timer : ReturnType<typeof setTimeout> | null = null;
        if (state.message != "") {
            
            if(state.responseType===ResponseType.success){
                timer = setTimeout(() => {
                    router.push("/dashboard");
                }, 3500)
            }
            
        }

        return () => clearTimeout(timer|| undefined);
    }, [state]);

    return (
        <>
            <form className="card-actions flex-col justify-center items-start gap-5 mt-5" action={formAction}>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <input type="text" className="grow" placeholder="Email" name="email" />
                </label>
                <PasswordInput/>
                <Button.Primary message="Login" loadingMessage="Logging in" />
                {state.message && <Alert.Default key={Date.now()} message={state.message} type={state.responseType} />}            
            </form>
        </>
    );
}

export default Login;
