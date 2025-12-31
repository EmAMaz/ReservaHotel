import { useQuery } from "@tanstack/react-query";
import ApiService from "../../service/apiService";

export function useUserAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userAuth"],
    queryFn: async () => {
      const api = new ApiService();
      return await api.authenticateUser()
    },
  });

  return {
    userAuth: data,
    isLoadingUser: isLoading,
    isErrorUser: isError,
  };
}
