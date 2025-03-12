import { AxiosRequestConfig } from "axios";

export function getRequestConfig(
  config: AxiosRequestConfig | undefined,
): AxiosRequestConfig {
  if (!config) {
    return {
      withCredentials: true,
    };
  } else {
    config.withCredentials = true;
    return config;
  }
}
