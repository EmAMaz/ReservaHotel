import { useMutation } from "@tanstack/react-query";
import ApiService from "../../service/apiService";
import toast from "react-hot-toast";

export function useUserLogin(cb: () => void) {
  const { data, mutate, isPending, isError } = useMutation({
    onSuccess: () => {
      cb();
    },
    onError: () => {
      toast.error('Datos incorrectos');
    },
    mutationFn: async (values: { email: string; password: string }) => {
      const api = new ApiService();
      return api.loginUser(values);
    },
  });

  return {
    user: data,
    loginUser: mutate,
    isPending,
    isError,
  };
}
