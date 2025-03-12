export function updateLocalInt(key: string, value: number | undefined) {
  if (value) {
    localStorage.setItem(key, value.toString());
  } else {
    localStorage.removeItem(key);
  }
}

export function updateLocalBool(key: string, value: boolean | undefined) {
  if (value !== undefined) {
    localStorage.setItem(key, value ? "true" : "false");
  } else {
    localStorage.removeItem(key);
  }
}

export function updateLocalString<T extends string>(
  key: string,
  value: T | undefined,
) {
  if (value) {
    localStorage.setItem(key, value.toString());
  } else {
    localStorage.removeItem(key);
  }
}
