"use client";

import { registerUser } from "@/app/actions/register";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import { useFormState } from "react-dom";
import { ResponseType } from "../../../types/enums";
import PasswordInput from "@/components/PasswordInput";
import { SignupFormData } from "@/types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseError, parseServerError } from "@/utils/errorParser";
import { ErrorResponse } from "@/types/errors";
import { useState } from "react";
import useSignup from "@/hooks/useSignup";

const initialState = {
    message: "",
    responseType: ResponseType.none
};


function Signup() {
    const { isPending, isError, error: server_signupError, data, mutate: server_getUser } = useSignup();
    const { register, handleSubmit } = useForm<SignupFormData>();
    const [error, setError] = useState<ErrorResponse | null>(null);

    const onSubmit: SubmitHandler<SignupFormData> = (formData) => {
        server_getUser(formData, {
            onSuccess: (data) => {
                if (data.type === ResponseType.success) {

                }
            },
            onError: (lError) => {
                let parsedError = parseError(lError);
                if (parsedError === null) {
                    parsedError = parseServerError(lError);
                }
                setError(parsedError);
                // setError();
            }
        });
    };
    return (
        <>

            <form className="card-actions flex-col justify-center items-center gap-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
                <label className="input input-bordered flex items-center gap-2 w-full ">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg> */}
                    <input type="text" className="grow" placeholder="Email" {...register('email')} name="email" />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full ">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                    <input type="text" className="grow" placeholder="First Name" {...register('firstName')} name="firstName" />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full ">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> */}
                    <input type="text" className="grow" placeholder="Last Name" {...register('lastName')} name="lastName" />
                </label>
                <PasswordInput register={register} />
                <Button.Primary message="Signup" />
                {isError && error && <Alert.Default key={Date.now()} message={error.description} type={error.type} />}
                {data !== undefined && <Alert.Default key={Date.now()} message={data.message} type={data.type} />}
            </form>
        </>
    );
}

export default Signup
