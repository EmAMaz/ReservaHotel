import { useQuery } from "@tanstack/react-query";
import ApiService from "../../service/apiService";

export function useGetAllRooms() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["roomsAll"],
    queryFn: async () => {
      const api = new ApiService();
      return await api.getRoomsAll()
    },
  });

  return {
    allRooms: data,
    isLoading,
    isError,
  };
}
