import type {  Guest as GuestI } from "domain-core";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./ReservationModel";

@Entity("guests")
export class Guest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @OneToMany(() => Reservation, (reservation: Reservation) => reservation.guest)
    reservations: Reservation[];
}