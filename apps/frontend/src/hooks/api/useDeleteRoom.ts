import { useMutation } from "@tanstack/react-query";
import ApiService from "../../service/apiService";
import toast from "react-hot-toast";

export function useDeleteRoom(cb: () => void) {
  const { mutate, isPending, isError } = useMutation({
    onSuccess: () => {
      cb();
    },
    onError: () => {
      toast.error('Datos incorrectos');
    },
    mutationFn: async (id: string) => {
      const api = new ApiService();
      return api.deleteRoom(id);
    },
  });

  return {
    deleteRoom: mutate,
    isPending,
    isError,
  };
}
