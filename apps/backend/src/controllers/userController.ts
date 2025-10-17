import { User, UserUsesCases } from "domain-core";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { comparePassword, encryptPassword } from "../utils/cryptoPassword";
import { withOutPassword } from "../utils/withOutPassword";

export class UserController {
  constructor(private userUsesCases: UserUsesCases) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body) throw new Error("Data is null");
      const { name, email, lastname, password, role } = req.body;

      const user: Omit<User, "id"> = {
        name,
        email,
        lastname,
        password: encryptPassword(password),
        role,
      };

      await this.userUsesCases.save(user);
      res
        .status(201)
        .json({ status: "Success", message: "User created" });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    if (!req.body) throw new Error("Data is null");
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new Error("Email or password is null");

      const result = await this.userUsesCases.login(email, password);

      const resultPasswordCompare = comparePassword(password, result.password);
      if (!resultPasswordCompare) res.status(401).json({ message: "Credentials invalid" });

      const data = withOutPassword(result);

      const token = sign({ data }, "here_is_secret_key", { expiresIn: "1h" });

      res.status(200).json({
        status: "Success",
        message: "User logged in",
        data,
        token,
      });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      res
        .status(200)
        .json({ status: "Success", message: "User authenticated" });
    } catch (err) {
      console.log(Error);
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
}
