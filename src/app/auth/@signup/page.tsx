"use client";

import Alert from "@/components/Alert";
import Button from "@/components/Button";
import { ResponseType } from "../../../types/enums";
import PasswordInput from "@/components/PasswordInput";
import { SignupFormData } from "@/types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseError, parseServerError } from "@/utils/errorParser";
import { ErrorResponse } from "@/types/errors";
import { useState } from "react";
import useSignup from "@/hooks/useSignup";

function Signup() {
    const { isPending, isError, error: server_signupError, data, mutate: server_getUser } =
        useSignup();
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
            },
        });
    };
    return (
        <>
            <form
                className="card-actions flex-col justify-center items-center gap-5 mt-5 w-full md:w-3/4 px-4 sm:px-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Email"
                        {...register("email")}
                        name="email"
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <input
                        type="text"
                        className="grow"
                        placeholder="First Name"
                        {...register("firstName")}
                        name="firstName"
                    />
                </label>
                <PasswordInput register={register} />
                <Button.Primary message="Sign Up" type="submit" />
                {isError && error && (
                    <Alert.Default
                        key={Date.now()}
                        message={error.description}
                        type={error.type}
                    />
                )}
                {data !== undefined && (
                    <Alert.Default key={Date.now()} message={data.message} type={data.type} />
                )}
            </form>
        </>
    );
}

export default Signup;
