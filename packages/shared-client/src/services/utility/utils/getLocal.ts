export function getLocalInt(key: string, defaultValue?: number) {
  const raw = localStorage.getItem(key);
  if (raw) {
    return Number.parseInt(raw);
  } else {
    return defaultValue;
  }
}

export function getLocalFloat(key: string, defaultValue?: number) {
  const raw = localStorage.getItem(key);
  if (raw) {
    return Number.parseFloat(raw);
  } else {
    return defaultValue;
  }
}

export function getLocalBool(key: string, defaultValue?: boolean) {
  const raw = localStorage.getItem(key);
  if (raw) {
    return raw === "true";
  } else {
    return defaultValue || false;
  }
}

export function getLocalString<T extends string>(
  key: string,
  defaultValue?: T,
) {
  const raw = localStorage.getItem(key);
  if (raw) {
    return raw as T;
  } else {
    return defaultValue as T;
  }
}
