import { useMutation } from "@tanstack/react-query";
import ApiService from "../../service/apiService";
import toast from "react-hot-toast";

export function useReservation(cb: () => void) {
  const { mutate, isPending, isError } = useMutation({
    onSuccess: () => {
      cb();
    },
    onError: () => {
      toast.error('Datos incorrectos');
    },
    mutationFn: async (values: { date: string, status: string, user: string, room: string, priceTotal: number }) => {
      const api = new ApiService();
      return api.reservateRoom(values);
    },
  });

  return {
    reservationRoom: mutate,
    isPending,
    isError,
  };
}
