import { useQuery } from "@tanstack/react-query";
import ApiService from "../../service/apiService";

export function useGetReservations() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      const api = new ApiService();
      return await api.getReservations()
    },
  });

  return {
    listReservations: data,
    isLoading,
    isError,
  };
}
