import { Router } from "express";
import { ReservationController } from "../controllers/reservationContoller";

export function createReservationRouter(controller: ReservationController): Router {
  const router = Router();
 
  router.post("/", controller.create.bind(controller));
  router.get("/:id", controller.getById.bind(controller));
  router.get("/", controller.getAll.bind(controller));
  return router;
}
