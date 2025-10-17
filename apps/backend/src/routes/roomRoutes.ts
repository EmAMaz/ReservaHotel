import { Router } from "express";
import { RoomController } from "../controllers/roomController";
import { emptyFields } from "../middleware/emptyFields";

export function createRoomRouter(controller: RoomController): Router {
  const router = Router();
 
  router.post("/", emptyFields, controller.create.bind(controller));
  router.get("/", controller.getAll.bind(controller));
  router.get("/:id", controller.getById.bind(controller));
  router.delete("/:id", controller.delete.bind(controller));

  return router;
}
