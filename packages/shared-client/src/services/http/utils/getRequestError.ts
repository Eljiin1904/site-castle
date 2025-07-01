import { isAxiosError } from "axios";

export function getRequestError(err: unknown) {
  if (isAxiosError(err)) {
    const error = new Error();
    console.error("Error in POST request:", err);
    if(err.response?.data?.error) {
      
      const axiosErrorContent = err.response.data.error;
      if (typeof axiosErrorContent === "string") {
        error.message = axiosErrorContent;
        error.cause = err.response.data.cause;   
      }
      else {
        error.message = axiosErrorContent.key || "An error occurred";
        error.cause = axiosErrorContent.value || {};
      }
    }
    return error;
  } else {
    return err;
  }
}
