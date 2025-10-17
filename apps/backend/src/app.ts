import "reflect-metadata";
import express, { Request, Response, Router } from "express";
import cors from "cors";
import { mainErrorHandler } from "./middleware/mainErrorHandler";

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => res.send("Hello World!!"));

export const configureRoutes = (endoint: string ,router: Router) => {
    app.use(`/${endoint}`, router);
}

app.use(mainErrorHandler);

export default app;
