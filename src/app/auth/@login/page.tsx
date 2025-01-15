"use client";

import { useState } from "react";
import { ResponseType } from "../../../types/enums";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/PasswordInput";
import useLogin from "@/hooks/useLogin";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormData } from "@/types/forms";
import { ErrorResponse } from "@/types/errors";
import { parseError, parseServerError } from "@/utils/errorParser";

function Login() {
    const router = useRouter();
    const { isPending, isError, error: server_loginError, data, mutate: server_getUser } =
        useLogin();
    const [error, setError] = useState<ErrorResponse | null>(null);
    const { register, handleSubmit } = useForm<LoginFormData>();

    const onSubmit: SubmitHandler<LoginFormData> = (formData) => {
        server_getUser(formData, {
            onSuccess: (data) => {
                if (data.type === ResponseType.success) {
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 3500);
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
                        {...register("email")}
                        type="text"
                        className="grow"
                        placeholder="Email"
                        name="email"
                    />
                </label>
                <PasswordInput register={register} />
                <Button.Primary message="Login" type="submit" />
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

export default Login;
