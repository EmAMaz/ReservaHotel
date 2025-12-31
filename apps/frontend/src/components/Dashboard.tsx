import { Header } from "./Header/Header";
import { useGetAllRooms } from "../hooks/api/useGetAllRooms";
import { Link, useNavigate } from "react-router";
import Button from "./Button/Button";

export const Dashboard = () => {
  const { allRooms } = useGetAllRooms();
  const navigate = useNavigate();

  const handleReservation = (id: string, roomPrice: number) => {
    const dataString = JSON.stringify({ id, roomPrice });
    navigate(`reservations/${btoa(dataString)}`);
  };

  return (
    <div className="h-full m-0 p-0">
      <Header
        title="RoomBooker"
        className="fixed top-0 left-0 w-full bg-white shadow-md z-40 mb-24"
      />

      {/* <div className="flex items-center h-screen">
        <Table listRooms={listRooms} isLoading={isLoading} isError={isError} />
      </div> */}
      <section className="bg-amber-300 h-20 mt-24 flex items-center">
        <ul className="pl-12">
          <Link to={"reservations-made"} className="font-semibold text-lg cursor-pointer">Mis reservas</Link>
        </ul>
      </section>

      <section className="mt-14 grid grid-col-1 justify-center items-center gap-8 bg-amber-300 p-12">
        {allRooms &&
          allRooms.data.map((room: any) => (
            <div
              key={room.id}
              id={room.id}
              className="flex border-2 border-black/50 h-[500px]"
            >
              <img
                src={room.image}
                className="w-[700px] h-[500px] object-cover"
              />
              <div className="flex flex-col justify-between p-8">
                <div className="flex flex-col gap-2">
                  <span className="bg-black p-2 text-white text-center">
                    Valor por dia: ${room.price.toLocaleString()}
                  </span>
                  <p className="uppercase">Tipo: {room.description}</p>
                  <p>Capacidad: {room.capacity}</p>
                </div>
                <Button key={room.id} children="Reservar" onClick={() => handleReservation(room.id, room.price)} className="flex bg-green-600 text-center justify-center text-white p-2 cursor-pointer"/>
              </div>
            </div>
          ))}
      </section>

      <footer className="bg-black/95">
        <p className="text-white text-xs font-semibold uppercase text-center p-1">
          © 2025 ReservaYa. Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
};
