import { createClient } from "redis";
import cron from "node-cron";
import { config } from "dotenv"; 
config();

(async () => {
  const redis = createClient();
  await redis.connect();

  cron.schedule('*/15 * * * *', async () => {
    await redis.publish(process.env.REDIS_CHANNEL, 'update');
  });
})();