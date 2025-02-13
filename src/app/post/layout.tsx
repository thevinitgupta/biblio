import DaisyThemeProvider from '@/hooks/useDaisyTheme'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

const PostsLayout = ({ children }: PropsWithChildren) => {
    return (
        <DaisyThemeProvider>
            <div className={`flex flex-col items-start justify-start px-0 md:px-8 lg:px-16 py-8 bg-base-100`}>
                {/* <ul className="w-full menu bg-base-200 lg:menu-horizontal rounded-box justify-around">
                    <li>
                        <Link href="/post/post-1">
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
                            Post 1
                            <span className="badge badge-sm">99+</span>
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
                        <a>
                            Stats
                            <span className="badge badge-xs badge-info"></span>
                        </a>
                    </li>
                </ul> */}

                {children}
            </div>
        </DaisyThemeProvider>
    )
}

export default PostsLayout