import { Router } from "express";
import { GuestController } from "../controllers/guestController";

export function createGuestRouter(controller: GuestController): Router {
  const router = Router();
 
  router.post("/", controller.create.bind(controller));
  router.get("/", controller.getAll.bind(controller));
  router.get("/:id", controller.getById.bind(controller));
  return router;
}
