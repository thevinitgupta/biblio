"use client";
import useFetchPublicKey from '@/hooks/useFetchPublicKey';
import useGlobalStore from '@/utils/zustand'
import React, { useEffect } from 'react'
import { useStore } from 'zustand'

const PublicKeyInitializer = () => {
    const setPublicKey = useGlobalStore((state) => state.setPublicKey);

    const {data, error, isLoading} = useFetchPublicKey();

    if(!isLoading && !error && data) {
        setPublicKey(data);
    }

  return null;
}

export default PublicKeyInitializer