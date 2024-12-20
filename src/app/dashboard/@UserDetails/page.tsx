"use client";
import { UserI } from '@/types/user';
import React, { useEffect } from 'react'

import useFetchUser from '@/hooks/useFetchUser';
import DetailsSkeleton from '@/components/DetailsSkeleton';

const UserDetailsPage = () => {
  const { data, error, isLoading } = useFetchUser();

  if (isLoading) {
      return <DetailsSkeleton lines={2}/>;
  }

  if (error) {
      return (
          <div>
              <h2>Error fetching user details</h2>
              <p>{error.description || "An unexpected error occurred."}</p>
          </div>
      );
  }

  return (
      <div>
          <h1>User Details</h1>
          {data && (
              < div>
                  <p><strong>Name:</strong> {data.data.firstName}</p>
                  <p><strong>Email:</strong> {data.data.email}</p>
              </div>
          )}
      </div>
  );
};
export default UserDetailsPage