import { createClient } from "redis";
import { cyan, red } from "chalk";

import config from "@config/config";

import { logger } from "@packages/logger";

const client = createClient({
  url: config.redis.url,
});

client.on("error", (error) => {
  const name = red("❌ Redis");
  logger.error(`${name} Something went wrong ${error}`);
});
client.on("connect", () => {
  const name = cyan("🌿 Redis");
  logger.info(`${name}: Connected`);
});

export default client;
