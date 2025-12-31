import app, { configureRoutes } from "./app";
import { AppDataSource } from "./db/connectionDB";
import "reflect-metadata";
import { RoomUsesCases, ReservationUsesCases, UserUsesCases } from "domain-core";
import { TypeOrmReservationRepository } from "./infrastructure/repositories/TypeOrmReservationRepository";
import { TypeOrmRoomRepository } from "./infrastructure/repositories/TypeOrmRoomRepository";
import { TypeOrmUserRepository } from "./infrastructure/repositories/TypeOrmUserRepository";

import { ReservationController } from "./controllers/reservationContoller";
import { RoomController } from "./controllers/roomController";
import { UserController } from "./controllers/userController";

import { createReservationRouter } from "./routes/reservationRoutes";
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
    const reservationRepository = new TypeOrmReservationRepository(dataSource);
    const userRepository = new TypeOrmUserRepository(dataSource);
    // USES CASES
    const createHotelUseCase = new RoomUsesCases(roomRepository);
    const createReservationUseCase = new ReservationUsesCases(reservationRepository);
    const createUserUseCase = new UserUsesCases(userRepository);
    // CONTROLLERS
    const roomController = new RoomController(createHotelUseCase);
    const reservationController = new ReservationController(createReservationUseCase);
    const userController = new UserController(createUserUseCase);

    const roomRouter = createRoomRouter(roomController);
    const reservationRouter = createReservationRouter(reservationController);
    const userRouter = createUserRouter(userController);

    configureRoutes("room", roomRouter);
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
