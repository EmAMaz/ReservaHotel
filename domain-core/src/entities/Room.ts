import { RoomType } from "../enums/RoomType";

export interface Room {
    id: number;
    roomNumber: number
    type: RoomType;
    capacity: number;
    description: string;
    image: string;
    price: number;
}