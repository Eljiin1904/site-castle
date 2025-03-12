import { Request } from "express";
import { Utility } from "@core/services/utility";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";
import config from "#app/config";

export default Http.createApiRoute({
  type: "post",
  path: "/start-session",
  secure: false,
  callback: async (req, res) => {
    const session = await checkSession(req);
    const region = await checkRegion(req);

    res.json({
      ...session,
      ...region,
    });
  },
});

async function checkSession(req: Request) {
  if (req.isAuthenticated()) {
    return {
      authenticated: true,
      user: Users.getAuthenticatedUser(req.user),
    };
  } else {
    return {
      authenticated: false,
    };
  }
}

async function checkRegion(req: Request) {
  if (config.env !== "production") {
    return { regionBlocked: false };
  }

  const { location } = await Http.getIpInfo(req.trueIP);
  const regionCode = location?.country_code;
  const regionBlocked = regionCode && Utility.blockedCountries.includes(regionCode);

  return { regionCode, regionBlocked };
}
