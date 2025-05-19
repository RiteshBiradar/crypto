import mongoose from "mongoose";
import dotenv from "dotenv";
import { asyncHandler } from "../utils/asyncHandler.js";
dotenv.config();

const connectDB = asyncHandler(async()=>{
    mongoose.connect(process.env.MONGO_URI)
})

export default connectDB;
