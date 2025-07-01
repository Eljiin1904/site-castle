import axios, { AxiosRequestConfig } from "axios";
import { Dates } from "@core/services/dates";
import config from "#client/config";
import { getRequestConfig } from "./getRequestConfig";
import { getRequestError } from "./getRequestError";

export async function post<T = any>(
  url: string,
  data?: any,
  requestConfig?: AxiosRequestConfig,
): Promise<T> {
  requestConfig = getRequestConfig(requestConfig);
  try {
    const result = await axios.post<T>(`${config.apiURL}${url}`, data, requestConfig);
    Dates.parseDates(result.data);
    return result.data;
  } catch (err) {
    throw getRequestError(err);
  }
}
