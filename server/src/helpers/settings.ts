import redis from "@packages/redis";
import { logger } from "@packages/logger";

import * as interfaces from "@interfaces/common";

export const settingsGet = async (): Promise<interfaces.ISettings> => {
  const defaultSettings: interfaces.ISettings = {
    rounded: 3,
  };

  try {
    let settings = await redis.get("settings");
    if (settings) {
      return JSON.parse(settings);
    }

    await redis.set("settings", JSON.stringify(defaultSettings));

    return defaultSettings;
  } catch (error) {
    logger.error("Settings Get Error:", error);
    return defaultSettings;
  }
};
