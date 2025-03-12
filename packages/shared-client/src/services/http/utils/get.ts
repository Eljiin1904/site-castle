import axios, { AxiosRequestConfig } from "axios";
import { Dates } from "@core/services/dates";
import config from "#client/config";
import { getRequestConfig } from "./getRequestConfig";
import { getRequestError } from "./getRequestError";

export async function get<T = any>(
  url: string,
  requestConfig?: AxiosRequestConfig,
): Promise<T> {
  requestConfig = getRequestConfig(requestConfig);
  try {
    const result = await axios.get<T>(`${config.apiURL}${url}`, requestConfig);
    Dates.parseDates(result.data);
    return result.data;
  } catch (err) {
    throw getRequestError(err);
  }
}
