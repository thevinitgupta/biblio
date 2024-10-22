
import CreatePostNavbar from '@/components/create/CreatePostNavbar'
import React, { PropsWithChildren } from 'react'

const CreatePostLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start px-16 py-8 gap-12">
            <CreatePostNavbar/>
            {children}
        </main>
    )
}

export default CreatePostLayout