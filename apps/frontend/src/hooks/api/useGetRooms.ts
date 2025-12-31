import { useQuery } from "@tanstack/react-query";
import ApiService from "../../service/apiService";

export function useGetRooms() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const api = new ApiService();
      return await api.getRoomsList()
    },
  });

  return {
    listRooms: data,
    isLoading,
    isError,
  };
}
