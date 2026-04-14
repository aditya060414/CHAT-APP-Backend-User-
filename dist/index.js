import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { createClient } from 'redis';
import userRoutes from './routes/user.js';
import { connectRabbitMQ } from './config/rabbitmq.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
const redisURL = process.env.REDIS_URL;
app.get("/", (req, res) => {
    res.send("Hello");
});
connectDb();
connectRabbitMQ();
if (!redisURL) {
    throw new Error("Redis URL is not defined");
}
export const redisClient = createClient({
    url: redisURL,
});
redisClient.connect().then(() => {
    console.log("Redis Connected");
}).catch(() => console.error("Redis Connection Failed"));
app.use("/api/v1/user", userRoutes);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map