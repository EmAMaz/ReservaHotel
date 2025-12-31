import { useQuery } from "@tanstack/react-query";
import ApiService from "../../service/apiService";

export function useLogout() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["logout"],
    queryFn: async () => {
      const api = new ApiService();
      return await api.logoutUser()
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
}