"use client";
import { UserI } from '@/types/user';
import React from 'react'
import DetailsSkeleton from './DetailsSkeleton';
import useFetchUser from '@/hooks/useFetchUser';
import { useQueryClient } from '@tanstack/react-query';
import { ResponseType } from '@/types/enums';

const UserDetails = () => {
    const {isPending, isLoading, isFetching,status,data, isError, error} = useFetchUser();
    console.log(status,data); 
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(['access-token']);
  console.log(token);
    if(isLoading) {
        return <DetailsSkeleton lines={2}/>
    }

    if(data?.type!==ResponseType.success || isError) {
        console.log("Error : ", error || data?.message)
        return (
          <div>Cannot access Profile page!</div>
        )
      }
  return (
    <div>Welcome, {data.data.firstName}</div>
  )
}

export default UserDetails