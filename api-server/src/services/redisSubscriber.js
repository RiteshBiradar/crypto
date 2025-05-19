import { storeCryptoStats } from "../controllers/crypto.controller.js";
import {createClient} from "redis"
import { asyncHandler } from "../utils/asyncHandler.js";

export const startRedisSubscriber = async()=>{
    const redis = createClient();
    redis.on('error', err => console.error('Redis Client Error', err));
    await redis.connect();
    await redis.subscribe(process.env.REDIS_CHANNEL, asyncHandler(async (message) => {
    if (message === 'update') {
        await storeCryptoStats();
    }
  }));
}