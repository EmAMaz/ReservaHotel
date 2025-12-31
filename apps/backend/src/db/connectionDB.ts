import { Room } from "../models/RoomModel";
import { Reservation } from "../models/ReservationModel";
import { User } from "../models/UserModel";
import { DataSource } from "typeorm";
import { configDotenv } from "dotenv";

configDotenv()

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST ? process.env.DB_HOST : "localhost", 
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER ? process.env.DB_USER : "root",
  password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "undefined",
  database: process.env.DB_DATABASE ? process.env.DB_DATABASE : "undefined",
  synchronize: true,
  logging: true,
  entities: [Room, Reservation, User],
  subscribers: [],
  migrations: [],
});
