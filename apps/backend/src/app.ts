import "reflect-metadata";
import express, { NextFunction, Request, Response, Router } from "express";
import session from "express-session";
import cors from "cors";
import coockieParser from "cookie-parser";
import { mainErrorHandler } from "./middleware/mainErrorHandler";
import { verify } from "jsonwebtoken";
import { UserSessionData } from "./types/express";
import { configDotenv } from "dotenv";

configDotenv();

const corsOptions = {
  origin: ["http://localhost", "http://localhost:8080"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(coockieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!req.session) {
    req.session = {} as any; // Usamos 'as any' o el tipo que definiste si es TS
  }

  req.session.user = null;

  if (token) {
    try {
      // 2. Verifica y asigna si es válido
      const data = verify(token, process.env.SECRET_KEY || "");
      req.session.user = data as UserSessionData;
    } catch (error) {
      // El token es inválido/expiró, el usuario sigue siendo null.
      // Opcional: limpiar la cookie si es inválido
      // res.clearCookie("access_token");
    }
  }

  next();
});

app.get("/", (req: Request, res: Response) => res.send("Hello World!!"));

export const configureRoutes = (endoint: string, router: Router) => {
  app.use(`/${endoint}`, router);
};

app.use(mainErrorHandler);

export default app;
