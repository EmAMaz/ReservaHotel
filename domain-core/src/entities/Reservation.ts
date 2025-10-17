import { ReservationStatus } from "../enums/ReservationStatus";
import { Guest } from "./Guest";
import { Room } from "./Room";

export interface Reservation {
    id: number;
    date: string;
    status: ReservationStatus;
    guest: Guest;
    room: Room;
    priceTotal: number;
}