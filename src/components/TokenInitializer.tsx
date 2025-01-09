"use client";

import useAccessToken from "@/hooks/useAccessToken";
import { privateAccessClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const TokenInitializer = () => {
    const queryClient = useQueryClient();
    const {setSession} = useGlobalStore();
    const router = useRouter();
    const pathname = usePathname();
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const {data} = useAccessToken();
        
      } catch (error) {
        console.error("Failed to fetch access token:", error);
        // Optionally handle error (e.g., redirect to login)
      }
    };

    fetchAccessToken();
  }, []);

  return null; // This component doesn't render anything
};

export default TokenInitializer;
