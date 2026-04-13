import mongoose, { Document, Model } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    avatar: string;
    isOnline: boolean;
    lastSeen: Date;
    socketId: string;
    friends: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}
declare const User: Model<IUser>;
export default User;
//# sourceMappingURL=user.d.ts.map