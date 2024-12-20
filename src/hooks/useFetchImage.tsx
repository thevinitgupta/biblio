import { loggingService } from "@/app/actions/logging";
import { loginUser } from "@/app/actions/loginUser";
import { LoginResponseType } from "@/types/authentication";
import { ImageDataResponseType, ProfileDataResponseType, ServerResponseType } from "@/types/common";
import { ResponseType, LoggerLevel } from "@/types/enums";
import { applicationErrors } from "@/types/errors";
import { privateAccessClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// TODO : Modify to be like useFetchUser and also modify other hooks similarly


const useFetchImage = () => {
    const queryClient = useQueryClient();
    const {sessionToken} = useGlobalStore();
    return useQuery({
        queryKey: ["image"],
        queryFn: async (): Promise<ImageDataResponseType> => {
            let token = queryClient.getQueryData(['access-token']);
            token = token || sessionToken || "";
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const fetchUserResponse = await privateAccessClient.get("/posts", {
                headers
            });

            return {
                message: "Success Image",
                data: fetchUserResponse.data,
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