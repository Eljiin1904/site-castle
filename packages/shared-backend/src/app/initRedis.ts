import config from "@server/config";
import redis from "redis";

const { redisUrl } = config;
const redisClient = redis
  .createClient({
    url: redisUrl,
  })
  .on("connect", () => {
    console.log("Redis Connected");
  });

export default redisClient;
