import express from "express"
import dotenv from "dotenv"
import connectDB from "./libs/db.js";
import cryptoRouter from "./routes/crypto.router.js"
import { errorHandler } from "./middleware/errorHandler.js";
import { startRedisSubscriber } from "./services/redisSubscriber.js";
dotenv.config()

const app = express();
app.use(express.json());


app.use("/api/v1/",cryptoRouter);


app.use(errorHandler);
startRedisSubscriber();
const startServer = async () => {
  connectDB(); 
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
  });
};
startServer();
