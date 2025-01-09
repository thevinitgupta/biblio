"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAccessToken from "@/hooks/useAccessToken";
import useGlobalStore from "@/utils/zustand";
import { ResponseType } from "@/types/enums";

const useEnsureAuth = () => {
  const { sessionToken } = useGlobalStore();
  const { mutate: refreshAccessToken, isError, isPending, data } = useAccessToken();
  const router = useRouter();

  useEffect(() => {
    const handleAuthCheck = () => {
      if (!sessionToken) {
        if (isError) {
          router.push("/auth"); 
        } else if (!isPending && (!data || data.type !== ResponseType.success)) {
          refreshAccessToken({});
        }
      }
      else router.refresh();
    };

    handleAuthCheck();
  }, [sessionToken, isError, isPending, data, refreshAccessToken, router]);
};

export default useEnsureAuth;
