import { NextFunction, Request, Response } from "express";

export const emptyFields = (req: Request, res: Response, next: NextFunction) => {
    const { type, capacity, description, image, price } = req.body;
    if (!type || !capacity || !description || !image || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};