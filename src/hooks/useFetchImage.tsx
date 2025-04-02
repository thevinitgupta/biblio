import { loggingService } from "@/app/actions/logging";

import { LoginResponseType } from "@/types/authentication";
import { ImageDataResponseType, ProfileDataResponseType, ServerResponseType } from "@/types/common";
import { ResponseType, LoggerLevel } from "@/types/enums";
import { applicationErrors } from "@/types/errors";
import { privateAccessClient, publicClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

// TODO : Modify to be like useFetchUser and also modify other hooks similarly


const useFetchImage = ({
    imageQueryKey,
    isPrivate,
    endpoint
}: {
    imageQueryKey : Array<string>,
    isPrivate : boolean,
    endpoint : string
}) => {
    const queryClient = useQueryClient();
    const {sessionToken} = useGlobalStore();
    return useQuery({
        queryKey: imageQueryKey,
        queryFn: async (): Promise<ImageDataResponseType> => {
            let token = queryClient.getQueryData(["access-token"]);
            token = token || sessionToken || "";
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const fetchHeaders = isPrivate ? {
                headers,
                responseType: "blob"
             } as AxiosRequestConfig : {
                responseType: "blob"
             } as AxiosRequestConfig;
             const axiosClient = isPrivate ? privateAccessClient : publicClient;
             const fetchUserResponse = await axiosClient.get(endpoint, fetchHeaders);
             const url = window.URL || window.webkitURL;
             const blob = new Blob([fetchUserResponse.data], { type: "image/jpeg" });
             const image = url.createObjectURL(blob);
             const blobUrl = url.createObjectURL(fetchUserResponse.data);
            
             console.log("image fetch resp",blob, image, blobUrl)

            return {
                message: "Success Image",
                data: image,
                type: ResponseType.success
            };

        },

        retry: false,
        retryDelay: 60,
        refetchOnWindowFocus: false,
        throwOnError: false,


    })
}

export default useFetchImage;