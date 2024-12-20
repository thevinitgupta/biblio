
import { useQuery, useQueryClient } from "@tanstack/react-query";

// not use react query for client state : https://github.com/TanStack/query/discussions/2852#discussioncomment-1553851
const useAuth = () => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey : ['access-token'],
        queryFn : () => {
            // console.log("USE AUTH USED!")
            // // throw new Error("Authentication Failed");
            return "";
        },
        throwOnError : true
    })
}

export default useAuth;