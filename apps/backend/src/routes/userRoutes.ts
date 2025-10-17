import { Router } from "express";
import { UserController } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

export function createUserRouter(controller: UserController): Router {
  const router = Router();
 
  router.post("/", controller.create.bind(controller));
  router.post("/login", controller.login.bind(controller));
  router.post("/authenticate", verifyToken, controller.authenticate.bind(controller));
  return router;
}
