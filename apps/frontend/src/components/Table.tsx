import { useEffect } from "react";
import type { RoomResponseAPI } from "../utils/types";

type Props = {
  listRooms?: RoomResponseAPI;
  isLoading?: boolean;
  isError?: boolean;
};

export const Table = (props: Props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  if (!props.listRooms)
    return (
      <section>
        <div>No hay habitaciones</div>
      </section>
    );
  return (
    <section className="mx-auto w-full flex justify-center">
      <div className="grid grid-cols-3 text-center gap-4">
        {props.listRooms.data.map((room: any) => (
          <div key={room.id}>
            <img
              src={room.image}
            />
            <p><a href={`#${room.id}`}>{room.description}</a></p>
            <span>${room.price.toLocaleString()}</span>
          </div>
        ))}
        {props.isLoading && <div>Loading...</div>}
        {props.isError && <div>Error</div>}
      </div>
    </section>
  );
};
