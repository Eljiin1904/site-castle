export function getMessage(err: unknown) {
  return err instanceof Error
    ? err.message
    : "Unknown error, please check the console.";
}
