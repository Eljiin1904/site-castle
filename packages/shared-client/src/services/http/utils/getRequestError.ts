import { isAxiosError } from "axios";

export function getRequestError(err: unknown) {
  if (isAxiosError(err) && err.response?.data?.error) {
    return new Error(err.response.data.error as string);
  } else {
    return err;
  }
}
