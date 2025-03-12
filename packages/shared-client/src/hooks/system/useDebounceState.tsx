import { Dispatch, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

export function useDebounceState<T>(
  defaultValue: T,
  callback: (x: T) => void,
  delay?: number,
): [T, Dispatch<T>];

export function useDebounceState<T>(
  defaultValue: undefined,
  callback: (x: T | undefined) => void,
  delay?: number,
): [T | undefined, Dispatch<T | undefined>];

export function useDebounceState<T>(
  defaultValue: T | undefined,
  callback: (x: T | undefined) => void,
  delay: number = 500,
): [T | undefined, Dispatch<T | undefined>] {
  const [value, setValue] = useState(defaultValue);
  const debounced = useDebounceCallback(callback, delay);

  const handleSetValue = (x: T | undefined) => {
    setValue(x);
    debounced(x);
  };

  return [value, handleSetValue];
}
