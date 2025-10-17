import { verify } from "jsonwebtoken";

export const verifyToken = (req: any, res: any, next: any) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if(!token) return res.status(401).json({message: "Token not provied"});

    try {
        const payload = verify(token, "here_is_secret_key");
        req.password = payload;
        next();
    } catch (error) {
        return res.status(403).json({message: "Token not valid"});
    }
}