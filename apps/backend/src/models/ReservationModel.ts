import { Reservation as ReservationI } from "domain-core";
import { ReservationStatus } from "domain-core";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Room } from "./RoomModel";
import { User } from "./UserModel";

@Entity("reservations")
export class Reservation extends BaseEntity implements ReservationI {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column({ type: "enum", enum: ReservationStatus })
  status: ReservationStatus;

  @ManyToOne(() => User, (user) => user.reservations, {
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "user_id"})
  user: User;

  @ManyToOne(() => Room, (room) => room.reservations)
  @JoinColumn({ name: "room_id" })
  room: Room;

  @Column()
  priceTotal: number;
}
