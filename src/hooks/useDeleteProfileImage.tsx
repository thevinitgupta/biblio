import { loggingService } from "@/app/actions/logging";
import { LoginResponseType } from "@/types/authentication";
import { ImageDataResponseType, ProfileDataResponseType, ServerResponseType } from "@/types/common";
import { ResponseType, LoggerLevel } from "@/types/enums";
import { applicationErrors } from "@/types/errors";
import { privateAccessClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// TODO : Modify to be like useFetchUser and also modify other hooks similarly


const useDeleteProfileImage = () => {
    const queryClient = useQueryClient();
    const {sessionToken} = useGlobalStore();
    return useMutation({
        mutationKey: ["profile-image"],
        mutationFn: async (): Promise<ImageDataResponseType> => {
            let token = queryClient.getQueryData(['access-token']);
            token = token || sessionToken || "";
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const fetchUserResponse = await privateAccessClient.delete("/user/profileImage", {
                headers,
            },);
            queryClient.invalidateQueries({
                queryKey : ["profile-image"],
                refetchType : "all",
                
            })
            return {
                message: "Success Image",
                data: fetchUserResponse.data,
                type: ResponseType.success
            };

        },

        retry: false,
        retryDelay: 60,
        throwOnError: false,


    })
}

export default useDeleteProfileImage;