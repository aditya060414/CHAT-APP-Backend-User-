import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    // password: {
    //     type: String,
    //     required: [true, 'Password is required'],
    //     minlength: 6,
    //     select: false, // Don't return password by default in queries
    // },
    avatar: {
        type: String,
        default: '',
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    lastSeen: {
        type: Date,
        default: Date.now,
    },
    socketId: {
        type: String, // Stores the current active socket connection ID
        default: null,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    timestamps: true, // Automatically creates createdAt and updatedAt
});
// 3. Pre-save hook: Hash password before saving to Node.js / MongoDB
userSchema.pre('save', async function () {
    if (!this.isModified('password'))
        return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    catch (error) {
        console.error(error);
    }
});
// 4. Method to compare passwords (used during login)
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password || '');
};
// 5. Create and export the model
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=user.js.map