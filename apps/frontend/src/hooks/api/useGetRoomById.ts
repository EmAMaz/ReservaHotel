import { useMutation } from "@tanstack/react-query";
import ApiService from "../../service/apiService";
import toast from "react-hot-toast";

export function useGetRoomById(cb: () => void) {
  const { mutate, data, isPending, isError } = useMutation({
    onSuccess: () => {
      cb();
    },
    onError: () => {
      toast.error('Datos incorrectos');
    },
    mutationFn: async (id: string) => {
      const api = new ApiService();
      return api.getRoomById(id);
    },
  });

  return {
    room: mutate,
    data,
    isPending,
    isError,
  };
}
