import React from 'react'

const DetailsSkeleton = ({ lines }: { lines: number }) => {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-4">

                {
                    Array(lines).fill(0).map((_, index) => {
                        return <div className="flex flex-col items-start gap-4 w-full" key={(index + 1) * lines}>
                            <div className="skeleton h-4 w-2/5 bg-primary/20"></div>
                            <div className="skeleton h-4 w-1/3 bg-primary/20"></div>
                        </div>
                    })
                }

            </div>

        </div>
    )
}

export default DetailsSkeleton;