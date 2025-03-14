import { isAxiosError } from "axios";

export function getRequestError(err: unknown) {
  if (isAxiosError(err) && err.response?.data?.error) {
    const error = new Error(err.response.data.error as string);
    error.cause = err.response.data.cause;
    return error;
  } else {
    return err;
  }
}
