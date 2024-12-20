"use client";
import Alert from '@/components/Alert';
import DaisyThemeProvider from '@/hooks/useDaisyTheme';
import useLogout from '@/hooks/useLogout';
import { ResponseType } from '@/types/enums';
import { ErrorResponse } from '@/types/errors';
import { parseServerError } from '@/utils/errorParser';
import useGlobalStore from '@/utils/zustand';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

const DashboardLayout = ({ children, UserDetails, posts }: {
    children: React.ReactNode,
    UserDetails: React.ReactNode,
    posts: React.ReactNode
}) => {
    const { sessionToken} = useGlobalStore();
    const {mutate : logout_user, isError, isPending} = useLogout();
    const [logoutError, setLogoutError] = useState({ 
        error : "" ,
        description: "" , 
        type: ResponseType.none } as ErrorResponse);
    const router = useRouter();
    useEffect(()=> {
        if(!sessionToken) {
            router.push("/auth")
        }
    }, [sessionToken]);

    // TODO : Implement handle logout to call logout_user with onSuccess and onFailure to display alert
    const handleLogout = () => {
        logout_user(undefined, {
            onSuccess : () => {
                router.push("/auth")
            },
            onError : (logout_error) => {
                const parsedError = parseServerError(logout_error);
                setLogoutError(parsedError);
            }
        });
    }
    return (
        <DaisyThemeProvider>
            <main className="flex h-screen flex-col items-start justify-start px-16 py-8">
                <ul className="w-full menu bg-base-200 lg:menu-horizontal rounded-box justify-around">
                    <li>
                        <Link href="/create">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Create New
                            <span className="badge badge-sm"></span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/post"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Feed
                            <span className="badge badge-sm badge-warning">NEW</span>
                        </Link>
                    </li>
                    <li>
                        <div onClick={handleLogout}>
                            Logout
                            <span className="badge badge-xs badge-info"></span>
                        </div>
                    </li>
                </ul>
                Profile
                {children}
                {UserDetails}
                {
                    isError && logoutError.type===ResponseType.error &&
                    <Alert.Error message={logoutError.description} />
                }
                {
                    isError && logoutError.type===ResponseType.warning &&
                    <Alert.Warning message={logoutError.description} />
                }
            </main>
        </DaisyThemeProvider>
    )
}

export default DashboardLayout