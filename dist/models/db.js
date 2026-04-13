import mongoose from 'mongoose';
const connectDb = async () => {
    const url = process.env.MONGO_URL;
    if (!url) {
        throw new Error("Environment variables MongoDB url error");
    }
    try {
        await mongoose.connect(url, { dbName: "chatMicroservicesApp" });
        console.log("MongoDB connnected");
    }
    catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
};
export default connectDb;
//# sourceMappingURL=db.js.map