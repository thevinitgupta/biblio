import React, { ReactNode, useEffect, useState } from 'react'
import CircularSkeleton from './CircularSkeleton'
import { useQueryClient } from '@tanstack/react-query';
import { ResponseType } from '@/types/enums';
import useFetchImage from '@/hooks/useFetchImage';
import Image from 'next/image';

const ProfileImage = ({height=200, width=200, hClass = 'h-12', wClass='w-12', borderClass, children}: {
  height?: number,
  width?: number,
  hClass?: string,
  wClass?: string,
  borderClass? : string,
  children?: ReactNode
}) => {
  const { isLoading, data, isError } = useFetchImage();
  const [isHovered, setIsHovered] = useState(false);

  if(!isLoading && (data?.type !== ResponseType.success || isError) ){
    return (
      <div className={`rounded-full flex items-center justify-center text-red-400 ${hClass} ${wClass} max-w-40 md:max-w-48 max-h-40 md:max-h-48`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>

      </div>);
  }


  else if (isLoading && !data) {
    return (
      <div className={`rounded-full flex items-center justify-center ${hClass} ${wClass} max-w-40 md:max-w-48 max-h-40 md:max-h-48`}>
        <span className="loading loading-spinner text-accent"></span>
      </div>
    )
  }

  else {
  return (
    <div className={`relative rounded-full overflow-hidden border-primary flex items-center ${hClass} ${wClass} ${borderClass || ""} max-w-40 md:max-w-48 max-h-40 md:max-h-48`}
    onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {isLoading && <CircularSkeleton />}
      {data?.type===ResponseType.success && 
        <Image alt='profile' src={data.data} layout="fill" className={`object-cover ${isHovered ? "scale-110" : "scale-100"} transition-transform duration-300`}/>
      }
      {isHovered && children && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4">
          {children}
        </div>
      )}
    </div>
  )}
}

export default ProfileImage