import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            id: string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ success: false, message: " User Unauthorized" });
            return;
        }

        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

        //check if decoding is successful
        if (!decode) {
            res.status(401).json({ success: false, message: "Invalid token" });
            return;
        }
        req.id = decode.userId;
        next();

    } catch (error) {
        res.status(500).json({ message: "Unauthorized" });
        return;
    }
}