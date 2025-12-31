import { useMutation } from "@tanstack/react-query";
import ApiService from "../../service/apiService";
import toast from "react-hot-toast";

export function useEditRoom(cb: () => void) {
  const { mutate, isPending, isError } = useMutation({
    onSuccess: () => {
      cb();
    },
    onError: () => {
      toast.error('Datos incorrectos');
    },
    mutationFn: async (values: {id: string, type: string, capacity: number | "", description: string, image: string, price: number | ""}) => {
      const api = new ApiService();
      return api.editRoom(values);
    },
  });

  return {
    editRoom: mutate,
    isPending,
    isError,
  };
}
