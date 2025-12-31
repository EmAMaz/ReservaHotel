import { Router } from "express";
import { UserController } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

export function createUserRouter(controller: UserController): Router {
  const router = Router();
 
  router.post("/", controller.create.bind(controller));
  router.post("/login", controller.login.bind(controller));
  router.get("/authenticate", controller.authenticate.bind(controller));
  router.post("/logout", controller.logout.bind(controller));
  return router;
}
