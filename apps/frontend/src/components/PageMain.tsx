import { useState } from "react";
import { useGetAllRooms } from "../hooks/api/useGetAllRooms";
import { Table } from "./Table";
import { LoginModal } from "./LoginModal";
import { useNavigate } from "react-router";
import { Header } from "./Header/Header";

type Props = {};

export const PageMain = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { allRooms, isLoading, isError } = useGetAllRooms();
  const navigate = useNavigate();

  // Funciones de navegación/autenticación simuladas
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleReservationAttempt = () => {
    setShowModal(true);
  };
  const handleLoginRedirect = () => {
    navigate("/login");
    setShowModal(false);
  };

  return (
    <div>
      <Header
        title="RoomBooker"
        className="fixed top-0 left-0 w-full bg-white shadow-md z-40"
        onLoginClick={handleLogin}
        onRegisterClick={handleRegister}
      />
      <div className="flex flex-col justify-center items-center h-screen mx-auto">
        <h1 className="text-3xl font-bold pb-4">¡Bienvenido/a a ReservaYa!</h1>
        <p className="max-w-2xl text-center font-semibold text-black/65">
          En ReservaYa, te ofrecemos un refugio tranquilo, diseñado para esos
          momentos en los que necesitas un escape de la rutina. Somos el lugar
          ideal para un descanso reparador o una pausa cómoda en tu día.
        </p>
      </div>
      <div className="flex items-center h-screen">
        <Table listRooms={allRooms} isLoading={isLoading} isError={isError} />
      </div>
      <section className="grid grid-col-1 justify-center items-center gap-8 bg-amber-300 p-12">
        {allRooms &&
          allRooms.data.map((room: any) => (
            <div
              key={room.id}
              id={room.id}
              className="flex border-2 border-black/50 h-[500px]"
            >
              <img
                src={room.image}
              />
              <div className="flex flex-col justify-between p-8">
                <div className="flex flex-col gap-2">
                  <span className="bg-black p-2 text-white text-center">
                    Valor por dia: ${room.price.toLocaleString()}
                  </span>
                  <p className="uppercase">Tipo: {room.description}</p>
                  <p>Capacidad: {room.capacity}</p>
                </div>
                <button
                  className="flex bg-green-600 text-center justify-center text-white p-2 cursor-pointer"
                  onClick={() => handleReservationAttempt()}
                >
                  Reservar
                </button>
              </div>
            </div>
          ))}
      </section>

      <LoginModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onLoginRedirect={handleLoginRedirect}
      />

      <footer className="bg-black/95">
        <p className="text-white text-xs font-semibold uppercase text-center p-1">
          © 2025 ReservaYa. Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
};
