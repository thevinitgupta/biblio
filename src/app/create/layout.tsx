
import CreatePostNavbar from '@/components/create/CreatePostNavbar'
import DaisyThemeProvider from '@/hooks/useDaisyTheme'
import React, { PropsWithChildren } from 'react'

const CreatePostLayout = ({ children }: PropsWithChildren) => {
    return (
        <DaisyThemeProvider>
        <main className="flex h-screen flex-col items-center justify-start px-2 md:px-16 py-4 md:py-8 gap-12">
            {/* <CreatePostNavbar/> */}
            {children}
        </main>
        </DaisyThemeProvider>
    )
}

export default CreatePostLayout