import express from "express"
import dotenv from "dotenv"
import connectDB from "./libs/db.js";
import cryptoRouter from "./routes/crypto.router.js"


dotenv.config()

const app = express();
app.use(express.json());

app.route("/api/v1/",cryptoRouter);

const startServer = async () => {
  connectDB(); 
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
  });
};

startServer();