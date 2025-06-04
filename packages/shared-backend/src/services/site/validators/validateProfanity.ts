import axios from "axios";
import config from "../../../config";
import { HandledError } from "@server/services/errors";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { LOG_MODULE_CONSTANTS } from "@core/services/logging/constants/LogConstant";

interface ValidateProfanityOptions {
  text: string;
  endpoint?: string;
}

const { webPurityApi } = config;
const logger = getServerLogger({ module: LOG_MODULE_CONSTANTS.LOG_SHARED_BACKEND });

export async function validateProfanity({
  text,
  endpoint = "https://api1.webpurify.com/services/rest/",
}: ValidateProfanityOptions): Promise<string[]> {
  const params = {
    method: "webpurify.live.return",
    api_key: webPurityApi,
    text,
    format: "json",
  };

  try {
    const response = await axios.get(endpoint, { params });
    const words = response.data.rsp.expletive;

    const profaneWords = Array.isArray(words) ? words : words ? [words] : [];
    return profaneWords;
  } catch (error) {
    logger.error(`Error checking profanity: ${error}`);
    throw new HandledError("Unable to process profanity check at this time.");
  }
}

export async function checkProfanityByField(fieldName: string, text: string) {
  const profaneWords = await validateProfanity({ text });

  if (profaneWords.length > 0) {
    logger.warn(`Profane words detected in ${fieldName}: ${profaneWords}`);
    const profaneWordsString = profaneWords.join(", ");
    throw new HandledError(
      `Unable to create Campaign due to profanity in ${fieldName}: ${profaneWordsString}`,
    );
  }
}
