import { privateAccessClient } from "@/utils/axiosUtil";
import useGlobalStore from "@/utils/zustand"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
    const queryClient = useQueryClient();
    const {setSession, sessionToken} = useGlobalStore();

    return useMutation({
        mutationKey : ["logout"],
        mutationFn : async () => {
            let token = queryClient.getQueryData(['access-token']) || sessionToken || "";
            
            const headers = {
                Authorization: `Bearer ${token}`
            };
            console.log("Logout : ",headers)
            const response = await privateAccessClient.post("/auth/logout", {}, {
                headers : headers
            });
            const responseData = response.data;

            setSession("");
            queryClient.invalidateQueries({
                queryKey : ["access-token"],
                exact : true
            });
            return responseData;
        }
    })
}

export default useLogout;