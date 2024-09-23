"use client";
import React, { Suspense } from 'react'

const DashboardLayout = ({children, UserDetails, posts} : {
    children: React.ReactNode,
    UserDetails: React.ReactNode,
    posts : React.ReactNode
}) => {

  return (
    <main className="flex h-screen flex-col items-center justify-center px-16 py-8">
      Profile
        {children}
        {UserDetails}
    </main>
  )
}

export default DashboardLayout