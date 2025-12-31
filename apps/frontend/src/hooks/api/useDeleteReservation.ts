import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiService from "../../service/apiService";

export function useDeleteReservation(cb: () => void) {
    const { mutate, isPending, isError } = useMutation({
        onSuccess: () => {
            cb();
        },
        onError: () => {
            toast.error('Datos incorrectos');
        },
        mutationFn: async (id: string) => {
            const api = new ApiService();
            return api.deleteReservation(id);
        },
    });

    return {
        deleteReservation: mutate,
        isPending,
        isError,
    };
};