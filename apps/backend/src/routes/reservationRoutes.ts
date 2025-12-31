import { Router } from "express";
import { ReservationController } from "../controllers/reservationContoller";

export function createReservationRouter(controller: ReservationController): Router {
  const router = Router();
 
  router.post("/", controller.create.bind(controller));
  router.get("/:id", controller.getById.bind(controller));
  router.get("/user/:id", controller.getByUserId.bind(controller));
  router.get("/", controller.getAll.bind(controller));
  router.put("/:id", controller.update.bind(controller))
  router.delete("/:id", controller.delete.bind(controller));
  return router;
}
