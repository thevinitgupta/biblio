"use client";

import DetailsSkeleton from '@/components/DetailsSkeleton';
import ProfileSkeleton from '@/components/DetailsSkeleton';
import ProfileImage from '@/components/ProfileImage';
import UserDetails from '@/components/UserDetails';
import PostCards from '@/components/posts/PostCards';
import useFetchUser from '@/hooks/useFetchUser';
import { ResponseType } from '@/types/enums';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'

const Dashboard = () => {
  return (
    <>
    {/* TODO : MOVE Profile Image to a Header Section for the Dashboard which is common for All Types of Users */}
    </>
  )
}

export default Dashboard