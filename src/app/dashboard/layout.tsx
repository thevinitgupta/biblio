"use client";
import Alert from '@/components/Alert';
import ProfileImage from '@/components/ProfileImage';
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
    
    const router = useRouter();
    useEffect(()=> {
        if(!sessionToken) {
            router.push("/auth")
        }
    }, [sessionToken]);

    
    return (
        <DaisyThemeProvider>
            <main className="flex h-screen flex-col items-start justify-start bg-base-100 mt-14">
                {UserDetails}
                {children}
                
            </main>
        </DaisyThemeProvider>
    )
}

export default DashboardLayout