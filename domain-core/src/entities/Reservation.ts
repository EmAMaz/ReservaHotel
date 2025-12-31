import { ReservationStatus } from "../enums/ReservationStatus";
import { Room } from "./Room";
import { User } from "./User";

export interface Reservation {
    id: number;
    date: string;
    status: ReservationStatus;
    user: Omit<User, "password">;
    room: Room;
    priceTotal: number;
}