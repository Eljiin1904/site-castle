import axios from "axios";
import { EmailInfoDocument } from "@core/types/http/EmailInfoDocument";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import config from "#app/config";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

export async function getEmailInfo(
  email: string,
): Promise<{ status: "valid" } | EmailInfoDocument> {
  const { hunterApiKey } = config;
  const logger = getServerLogger({});

  const document = await Database.collection("email-info").findOne({ email });

  if (document) {
    return document;
  }

  const resp = await axios.get("https://api.hunter.io/v2/email-verifier", {
    params: {
      email,
      api_key: hunterApiKey,
    },
  });

  if (resp.status !== 200) {
    logger.error("error calling hunter.io email-verifier: " + resp.data);
  }

  const insert: EmailInfoDocument = {
    _id: Ids.object(),
    ...resp.data,
    email,
  };

  try {
    await Database.collection("email-info").insertOne(insert);
  } catch (error: any) {
    logger.error("error inserting email verification: " + error.message);
  }

  return insert;
}
