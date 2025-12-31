import { UserType } from "domain-core";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./ReservationModel";

@Entity("users")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({ type: "enum", enum: UserType, default: UserType.GUEST })
    role: UserType;

    @OneToMany(() => Reservation, (reservation: Reservation) => reservation.user, { onDelete: "CASCADE" })
    reservations: Reservation[];
}