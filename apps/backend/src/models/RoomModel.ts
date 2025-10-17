import type {  Room as IRoom } from "domain-core";
import { RoomType } from "domain-core";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./ReservationModel";

@Entity("rooms")
export class Room extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomNumber: number;

    @Column({ type: "enum", enum: RoomType })
    type: RoomType;

    @Column()
    capacity: number;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;

    @OneToMany(() => Reservation, (reservation: Reservation) => reservation.room)
    reservations: Reservation[]
}