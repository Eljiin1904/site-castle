import { Utility } from "@core/services/utility";
import { HandledError } from "@server/services/errors";
import { Http } from "@server/services/http";
import config from "#app/config";
import { getIpInfo } from "../utils/getIpInfo";

export const regionHandler = Http.createHandler(async (req, res, next) => {
  if (config.env !== "production") {
    next();
    return;
  }

  const { location } = await getIpInfo(req.trueIP);

  if (location && Utility.blockedCountries.includes(location.country_code)) {
    throw new HandledError("Castle.com is unavailable in your region.");
  }

  next();
});
