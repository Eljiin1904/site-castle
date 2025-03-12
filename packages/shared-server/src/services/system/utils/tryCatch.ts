import { handleError } from "./handleError";

export function tryCatch<T extends any[]>(
  callback: (...args: T) => void | Promise<void>,
) {
  const handler = async (...args: T) => {
    try {
      await callback(...args);
    } catch (err) {
      handleError(err);
    }
  };

  return handler;
}
