import { ResponseType } from "@/types/enums";
import { CreatePostData, CreatePostSchema } from "@/types/forms";
import { privateAccessClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const useAccessToken = () => {
    const queryClient = useQueryClient();
    const {setSession} = useGlobalStore();
    return useMutation({
        mutationKey: ["refresh-token"],
        mutationFn: async (values: any) => {
            
            const response = await privateAccessClient.post(
                "/auth/access-token",
                {},
                { withCredentials: true } // Ensures the refresh token is included
              );
              const { accessToken } = response.data;
                  console.log("Access Token on App Init : ", accessToken, response.data)
              // Store the access token in memory for use in the Axios client
              queryClient.setQueryData(["access-token"], accessToken);
              setSession(accessToken);
        
        return {message : "success", type : ResponseType.success};

        },
    })
}

export default useAccessToken;