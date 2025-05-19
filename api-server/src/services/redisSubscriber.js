import { storeCryptoStats } from "../controllers/crypto.controller.js";
import {createClient} from "redis"

export const startRedisSubscriber = async()=>{
    const redis = createClient();
    await redis.connect();
    await redis.subscribe(process.env.REDIS_CHANNEL, (message) => {
    if (message === 'update') {
        console.log('Update received from worker. Fetching new stats...');
        storeCryptoStats();
    }
  });
}