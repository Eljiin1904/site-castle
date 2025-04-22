import { AxiosRequestConfig, Method } from "axios";
import crypto from "crypto";
import config from "#server/config";

export function getSumsubAxiosConfig(params: { url: string; method: Method }) {
  const appToken = config.sumsubAppToken;
  const secretKey = config.sumsubSecretKey;

  let axiosConfig: AxiosRequestConfig = {};
  axiosConfig.baseURL = "https://api.sumsub.com";

  let headers = {
    Accept: "application/json",
    "X-App-Token": appToken,
  };

  axiosConfig.method = params.method;
  axiosConfig.url = params.url;
  axiosConfig.headers = headers;
  axiosConfig.data = null;

  const ts = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac("sha256", secretKey);
  signature.update(ts + axiosConfig.method.toUpperCase() + axiosConfig.url);

  axiosConfig.headers["X-App-Access-Ts"] = ts;
  axiosConfig.headers["X-App-Access-Sig"] = signature.digest("hex");

  return axiosConfig;
}
