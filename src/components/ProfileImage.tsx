import React, { useEffect } from 'react'
import CircularSkeleton from './CircularSkeleton'
import { useQueryClient } from '@tanstack/react-query';
import useFetchUser from '@/hooks/useFetchUser';
import { ResponseType } from '@/types/enums';
import useFetchImage from '@/hooks/useFetchImage';

const ProfileImage = () => {
  const { isPending, isLoading, isFetching, status, data, isError, error } = useFetchImage();
  console.log(status, data);
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(['access-token']);
  console.log(token);


  if (data?.type !== ResponseType.success || isError) {
    console.log("Error : ", error || data?.message)
    return (
      <div>Cannot access Profile Image!</div>
    )
  }
  useEffect(() => {
    useFetchUser();
  }, [token])
  return (
    <div className='w-28 h-28 rounded-full'>
      {isLoading && <CircularSkeleton />}
    </div>
  )
}

export default ProfileImage