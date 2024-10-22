'use client'
import Image from 'next/image'
import { Inter } from "next/font/google";
import "./globals.css";
import { loggingService } from './actions/logging';
import { LoggerLevel } from '@/types/enums';
import { useEffect } from 'react';
import useLogger from '@/hooks/useLogger';

const inter = Inter({ subsets: ["latin"] });
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  
  const logger = useLogger(error.digest || 'App Crashed, caught in Global Error Handler', LoggerLevel.error)
  return (
    <html data-theme="noir" lang="en">
      <body className={inter.className}>
      <section className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col justify-start lg:flex-row lg:gap-14">
                <Image alt={"Server Down"} src={`/sleeping.svg`} width={420} height={420} className="max-w-xs rounded-lg shadow-2xl" />
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Oh Crumbs! We're having a temporary outage.</h1>
                    <p className="py-6">Don't fret,
                        fellow bookworms! Our library shelves are undergoing a bit of maintenance, but we'll be back with a fresh story soon. While you wait, why not grab a physical book from your own collection and dive into a captivating adventure?</p>
                    <button onClick={() => {reset()}} className="btn btn-accent">Retry Accessing
                    </button>
                </div>
            </div>
        </section>
      </body>
    </html>
  )
}