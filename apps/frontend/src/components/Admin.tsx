import { useEffect, useState } from "react";
import { Header } from "./Header/Header";
import { useGetReservations } from "../hooks/api/useGetReservations";
import { useGetAllRooms } from "../hooks/api/useGetAllRooms";
import { useNavigate } from "react-router";
import { useDeleteRoom } from "../hooks/api/useDeleteRoom";
import toast from "react-hot-toast";
import { DeleteModal } from "./DeleteModal";
import Button from "./Button/Button";

export const Admin = () => {
  const [bienvenidaMsj, setBienvenidaMsj] = useState(true);
  const [showReservations, setShowReservations] = useState(false);
  const [showRooms, setShowRooms] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { listReservations } = useGetReservations();
  const { deleteRoom } = useDeleteRoom(() => {
    toast.success("Habitacion eliminada");
  });
  const { allRooms } = useGetAllRooms();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
        setBienvenidaMsj(false);
    }, 1500);
  }, []);

  const getReservation = () => {
    setShowRooms(false);
    setShowReservations(true);
  };

  const getRoom = () => {
    setShowReservations(false);
    setShowRooms(true);
  };

  const handleEditRoom = (id: string) => {
    console.log("Editando habitación con ID:", id);
    const dataString = JSON.stringify({ id });
    navigate(`edit-room/${btoa(dataString)}`);
  };

  const handleDeleteRoom = () => {
    deleteRoom(roomId);
    setShowDeleteModal(false)
  }

  return (
    <div className="pt-26 container w-4xl mx-auto">
      <Header title="RoomBooker" className="fixed top-0 left-0 w-full bg-white shadow-md z-40"/>
      {bienvenidaMsj && (
        <h1 className="text-xl text-black">
          Bienvenido al panel de administrador!
        </h1>
      )}
      <h2 className="text-lg pt-12 pb-4">Menu de administración</h2>
      <section className="grid grid-cols-2 gap-4 border-2 rounded-md p-12">
        <div className="p-2 border-2 text-center cursor-pointer" onClick={getReservation}>
          <span>Reservaciónes</span>
        </div>
        <div className="p-2 border-2 text-center cursor-pointer" onClick={getRoom}>
          <span>Habitaciones</span>
        </div>
      </section>

      <div>

        <ul>
          {showReservations && listReservations && (
            <li>
              <h2 className="my-8 border-b-2">Reservaciones actuales</h2>
              <ul>
                {listReservations.data.length > 0 ? listReservations.data.map((reservation: any) => (
                  <li className="flex flex-col border-y-2 bg-amber-200 py-4" key={reservation.id}>
                    <span>Fecha: {reservation.date}</span>
                    <span>Estado: {reservation.status}</span>
                    <span>Usuario: {reservation.user.name}</span>
                    <span>Habitación: {reservation.room.description}</span>
                    <span>Precio total: {reservation.priceTotal}</span>
                  </li>
                )) : (
                  <li className="text-center">No hay reservaciones</li>
                )}
              </ul>
            </li>
          )}
        </ul>

        <ul>
          {showRooms && allRooms && (
            <li>
              <h2 className="my-8 border-b-2">Habitaciones</h2>
              <ul>
                {allRooms.data.length > 0 ? allRooms.data.map((room: any) => (
                  <li className="flex justify-between items-center px-4 border-y-2 bg-amber-200 py-4" key={room.id}>
                    <div className="flex flex-col">
                      <span>Tipo: {room.type}</span>
                      <span>Capacidad: {room.capacity}</span>
                      <span>Descripción: {room.description}</span>
                      <span>Imagen: <img src={room.image} className="w-[400px] h-[200px] object-cover"/></span>
                      <span>Precio: ${room.price.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div><Button children="Editar" className="flex-1 px-4 py-2 text-white rounded-lg bg-green-500/70 p-2 hover:bg-green-500/70 font-medium transition-colors cursor-pointer" onClick={() => {handleEditRoom(room.id)}}/></div>
                      <div><Button children="Eliminar" className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors cursor-pointer" onClick={() => {setRoomId(room.id), setShowDeleteModal(true)}}/></div>
                    </div>
                  </li>
                )) : (
                  <li className="text-center">No hay habitaciones...</li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </div>

      {showDeleteModal && <DeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} handleDeleteRoom={handleDeleteRoom}/>}
    </div>
  );
};
