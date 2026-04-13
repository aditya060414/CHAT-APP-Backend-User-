import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../models/user.js"
import jwt, { type JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const Auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Authentication Failed, No header.Please login."
            });
            return;
        }

        const token = authHeader.split(" ")[1]!;
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (!decodedValue || !decodedValue.user) {
            res.status(401).json({
                messageg: "Invalid Token"
            });
            return;
        }
        req.user = decodedValue.user;
        next();
    } catch (error) {
        res.status(401).json({
            message: "User not logged in. JWT error."
        });
        return;
    }
}