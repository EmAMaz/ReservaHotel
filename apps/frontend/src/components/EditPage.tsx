import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { useEditRoom } from "../hooks/api/useEditRoom";
import toast from "react-hot-toast";
import { useGetRoomById } from "../hooks/api/useGetRoomById";
import Button from "./Button/Button";

// 1. Tipado de los datos del formulario
interface RoomFormData {
  type: string;
  capacity: number | "";
  description: string;
  image: string;
  price: number | "";
}

export const RoomForm = () => {
  let { roomId } = useParams();
  const navigate = useNavigate();
  const { room, data } = useGetRoomById(() => {});
  const [idSome, setIdSome] = useState<string>("");
  const { editRoom, isPending: isPendingEdit } = useEditRoom(() => {
    setTimeout(() => {
      toast.success("Habitacion actualizada");
    }, 800);
    navigate(-1);
  });

  useEffect(() => {
    if (!roomId) return;
    const decodedDate = atob(roomId);
    const data = JSON.parse(decodedDate);
    room(data.id.toString());
    setIdSome(data.id.toString());
  }, []);

  const [formData, setFormData] = useState<RoomFormData>({
    type: "",
    capacity: "",
    description: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    if (!data) return;
    setFormData({
      type: data.data.type,
      capacity: data.data.capacity,
      description: data.data.description,
      image: data.data.image,
      price: data.data.price,
    });
  }, [data]);

  const roomTypes = ["STANDARD", "SUITE", "DELUXE"];

  // Maneja el cambio de los inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "capacity" || name === "price"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.capacity === "" || formData.price === "") {
      alert("Por favor, completa todos los campos numéricos.");
      return;
    }
    console.log(formData);
    editRoom({ ...formData, id: idSome.toString() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-xl p-8 shadow-xl rounded-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">
        Editar Habitación
      </h2>

      <section className="w-full shadow-md rounded-lg p-6">
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tipo de Habitación
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Capacidad (Personas)
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Amplia habitación con vista al mar y balcón privado."
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            URL de la Imagen
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Precio por Noche ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Button
          type="submit"
          className="bg-green-500/80 w-full py-2 px-4 rounded-md text-white font-semibold transition duration-150 cursor-pointer hover:bg-green-500 mt-6"
        >
          {isPendingEdit ? ("Guardando...") : ("Guardar")}
        </Button>
      </section>
    </form>
  );
};
