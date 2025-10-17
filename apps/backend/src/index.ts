import app, { configureRoutes } from "./app";
import { AppDataSource } from "./db/connectionDB";
import "reflect-metadata";
import { RoomUsesCases, GuestUsesCases, ReservationUsesCases, UserUsesCases } from "domain-core";
import { TypeOrmReservationRepository } from "./infrastructure/repositories/TypeOrmReservationRepository";
import { TypeOrmRoomRepository } from "./infrastructure/repositories/TypeOrmRoomRepository";
import { TypeOrmGuestRepostory } from "./infrastructure/repositories/TypeOrmGuestRepository";
import { TypeOrmUserRepository } from "./infrastructure/repositories/TypeOrmUserRepository";

import { ReservationController } from "./controllers/reservationContoller";
import { GuestController } from "./controllers/guestController";
import { RoomController } from "./controllers/roomController";
import { UserController } from "./controllers/userController";

import { createReservationRouter } from "./routes/reservationRoutes";
import { createGuestRouter } from "./routes/guestRoutes";
import { createRoomRouter } from "./routes/roomRoutes";
import { createUserRouter } from "./routes/userRoutes";
import { configDotenv } from "dotenv";

configDotenv();
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

async function main() {
  try {
    const dataSource = await AppDataSource.initialize();

    // REPOSITORIES
    const roomRepository = new TypeOrmRoomRepository(dataSource);
    const guestRepository = new TypeOrmGuestRepostory(dataSource);
    const reservationRepository = new TypeOrmReservationRepository(dataSource);
    const userRepository = new TypeOrmUserRepository(dataSource);
    // USES CASES
    const createHotelUseCase = new RoomUsesCases(roomRepository);
    const createGuestUseCase = new GuestUsesCases(guestRepository);
    const createReservationUseCase = new ReservationUsesCases(reservationRepository);
    const createUserUseCase = new UserUsesCases(userRepository);
    // CONTROLLERS
    const roomController = new RoomController(createHotelUseCase);
    const guestController = new GuestController(createGuestUseCase);
    const reservationController = new ReservationController(createReservationUseCase);
    const userController = new UserController(createUserUseCase);

    const roomRouter = createRoomRouter(roomController);
    const guestRouter = createGuestRouter(guestController);
    const reservationRouter = createReservationRouter(reservationController);
    const userRouter = createUserRouter(userController);

    configureRoutes("room", roomRouter);
    configureRoutes("guest", guestRouter);
    configureRoutes("reservation", reservationRouter);
    configureRoutes("user", userRouter);

    app.listen(port, () => {
      console.log("Server running on port", port);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

main();
