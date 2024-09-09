
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useAuth = () => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey : ['access-token'],
        queryFn : () => {
            
        },
    })
}