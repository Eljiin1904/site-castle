import axios from "axios";
import config from "#app/config";
import { Http } from "#app/services/http";
import { Verification } from "@server/services/verification";

// https://docs.sumsub.com/reference/authentication

function getAccessToken(applicantId: string) {
  const ttlInSecs = 600;
  const levelName =
    config.env === "production" ? "basic-kyc-level" : "basic-kyc-level-staging";
  const url = `/resources/accessTokens?userId=${applicantId}&ttlInSecs=${ttlInSecs}&levelName=${levelName}`;

  return Verification.getSumsubAxiosConfig({ url, method: "post" });
}

export default Http.createApiRoute({
  type: "post",
  path: "/get-sumsub-token",
  secure: true,
  callback: async (req, res, next) => {
    const user = req.user;

    const { data } = await axios(getAccessToken(user._id));
    res.status(200).send({ token: data.token });
  },
});
