export function parseDates(field: unknown) {
  if (field === null || field === undefined || typeof field !== "object") {
    return;
  }

  const obj = field as Record<string, any>;

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (isIsoDateString(value)) {
      obj[key] = new Date(value as string);
    } else if (typeof value === "object") {
      parseDates(value);
    }
  }
}

const isoDateFormat =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

function isIsoDateString(value: any): boolean {
  return (
    value != null && typeof value === "string" && isoDateFormat.test(value)
  );
}
