"use client";

import DetailsSkeleton from '@/components/DetailsSkeleton';
import ProfileSkeleton from '@/components/DetailsSkeleton';
import ProfileImage from '@/components/ProfileImage';
import UserDetails from '@/components/UserDetails';
import useFetchUser from '@/hooks/useFetchUser';
import { ResponseType } from '@/types/enums';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'

const Dashboard = () => {
    // const session = await getSession();
    

  

  
  
    // if(!session) redirect("/auth")
  return (
    <>
    <ProfileImage />
    <UserDetails/>
    </>
  )
}

export default Dashboard