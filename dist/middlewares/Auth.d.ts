import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../models/user.js";
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export declare const Auth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=Auth.d.ts.map