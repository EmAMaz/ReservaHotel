import { useEffect } from "react";
import { useGetReservationByUserId } from "../hooks/api/useGetReservationByUserId";
import { useUserAuth } from "../hooks/api/useAuthUser";
import { useDeleteReservation } from "../hooks/api/useDeleteReservation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "./Button/Button";

export const ReservationMade = () => {
  const { reservation, data } = useGetReservationByUserId(() => {});
  const { userAuth, isLoadingUser } = useUserAuth();
  const navigate = useNavigate();
  const { deleteReservation } = useDeleteReservation(() => {
    toast.success("Reserva Eliminada");
    navigate(-1);
  });

  useEffect(() => {
    if (!userAuth?.data.data.id) return;
    reservation(userAuth?.data.data.id.toString());
  }, [isLoadingUser]);

  const handleDeleteRoom = (id: string) => {
    deleteReservation(id);
  };

  return (
    <div className="my-12">
      <span className="text-xl font-semibold">Mis reservas</span>
      {isLoadingUser && <div>Cargando...</div>}
      <ul className="mt-4">
        {data && data.data.length > 0 ? (
          data.data.map((reservation: any) => (
            <li
              key={reservation.id}
              className="flex flex-col gap-2 bg-amber-300 p-2 rounded-lg"
            >
              <span>Fecha de Reseva: {reservation.date}</span>
              <span>Estado: {reservation.status}</span>
              <span>Precio: ${reservation.priceTotal.toLocaleString()}</span>
              <span>Tipo: {reservation.room.type}</span>
              <div className="gap-2 flex mt-4">
                <Button
                  children="Eliminar"
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors cursor-pointer"
                  onClick={() => {
                    handleDeleteRoom(reservation.id);
                  }}
                />
              </div>
            </li>
          ))
        ) : (
          <div>No hay reservas...</div>
        )}
      </ul>
    </div>
  );
};
