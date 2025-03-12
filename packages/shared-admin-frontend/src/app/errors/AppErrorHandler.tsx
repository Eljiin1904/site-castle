import { useState, useEffect } from "react";
import { Errors } from "@client/services/errors";

export const AppErrorHandler = () => {
  const [error, setError] = useState<unknown | null>(null);

  if (error) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
  }

  useEffect(() => {
    const handler = (inc: unknown | null) => setError(inc);
    Errors.manager.on("change", handler);
    return () => {
      Errors.manager.off("change", handler);
    };
  }, []);

  return null;
};
