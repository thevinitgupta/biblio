"use client";
import React, { Suspense } from 'react'

const DashboardLayout = ({children, details, posts} : {
    children: React.ReactNode,
    details: React.ReactNode,
    posts : React.ReactNode
}) => {

  return (
    <main className="flex h-screen flex-col items-center justify-center px-16 py-8">
      Profile
        {children}
    </main>
  )
}

export default DashboardLayout