import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useReservation } from "../hooks/api/useReservation";
import { useUserAuth } from "../hooks/api/useAuthUser";
import Button from "./Button/Button";

interface ReservationI {
  id: number;
  date: string;
  status: string;
  guest: number;
  room: number;
  priceTotal: number;
}

export const Reservation = (props: any) => {
  let { categoryId } = useParams();
  const [isChecked, setIsChecked] = useState(false);
  const [priceTotal, setPriceTotal] = useState(0);
  const [priceRoom, setPriceRoom] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [errorInvalidDate, setErrorInvalidDate] = useState(false);
   const navigate = useNavigate();
  const { reservationRoom, isPending, isError } = useReservation(() => {
    toast.success("Reserva realizada");
  });
   const { userAuth } = useUserAuth();
  const [formData, setFormData] = useState({
    fechaDesde: "",
    fechaHasta: "",
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    console.log("isChecked:", isChecked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!categoryId) return;
    const decodedDate = atob(categoryId);
    const data = JSON.parse(decodedDate);
    setPriceRoom(data.roomPrice);
    setRoomId(data.id);
  }, []);

  useEffect(() => {
    if (!isChecked) {
      setPriceTotal(priceRoom);
      return setErrorInvalidDate(false);
    }
    if (formData.fechaDesde && !isChecked) {
      setErrorInvalidDate(false);
      setPriceTotal(priceRoom);
    }
    if (new Date(formData.fechaDesde) > new Date(formData.fechaHasta)) {
      setErrorInvalidDate(true);
      setPriceTotal(priceRoom);
      toast.error("Fechas invalidas para la reserva");
    } else {
      if (formData.fechaDesde && formData.fechaHasta) {
        setErrorInvalidDate(false);
        const diffTime = Math.abs(
          new Date(formData.fechaHasta).getTime() -
            new Date(formData.fechaDesde).getTime()
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(priceRoom * diffDays);
        if (priceRoom * diffDays === 0) return;
        setPriceTotal(priceRoom * diffDays);
      }
    }
  }, [formData, isChecked]);

  const handleReservationRoom = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    reservationRoom({
      date: formData.fechaDesde.split('-').reverse().join('-') + "," + formData.fechaHasta.split('-').reverse().join('-'),
      status: "CONFIRMED",
      user: userAuth ? userAuth?.data.data.id.toString() : "",
      room: roomId ? roomId.toString() : "",
      priceTotal,
    });
    setTimeout(() => {
     navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-col w-[300px]">
        <h1 className="font-bold text-2xl border-b-2 pb-2">
          Elegir dia a reservar
        </h1>
        <form
          className="flex flex-col"
          onSubmit={handleReservationRoom}
        >
          <section className="flex flex-col gap-12 py-12 items-center">
            <section className="flex items-center gap-4">
              <label htmlFor="checkbox-more-days">Más de un dia</label>
              <input
                className="p-2 w-6 h-6 border-2 rounded-lg"
                type="checkbox"
                name="masDeUnDia"
                id="masDeUnDia"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </section>
            <section className="flex items-center gap-4">
              {isChecked && <label htmlFor="data">Desde</label>}
              <input
                className="p-2 border-2 rounded-lg"
                type="date"
                name="fechaDesde"
                id="fechaDesde"
                value={formData.fechaDesde}
                onChange={handleChange}
              />
            </section>
            {isChecked && (
              <section className="flex items-center gap-4">
                <label htmlFor="data">Hasta</label>
                <input
                  className="p-2 border-2 rounded-lg"
                  type="date"
                  name="fechaHasta"
                  id="fechaHasta"
                  value={formData.fechaHasta}
                  onChange={handleChange}
                />
              </section>
            )}
          </section>
          {!errorInvalidDate && formData.fechaDesde !== "" && (
            <section className="border-t-2 p-4">
              <span className="text-lg font-semibold">
                Precio total: ${priceTotal.toLocaleString()}
              </span>
              <Button children="Reservar" type="submit" className="flex w-full rounded-lg h-12 items-center bg-green-600 mt-2 text-center justify-center text-white p-2 cursor-pointer"/>
            </section>
          )}
        </form>
      </div>
    </div>
  );
};
