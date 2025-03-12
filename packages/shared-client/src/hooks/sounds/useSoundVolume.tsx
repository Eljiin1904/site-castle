import { Dispatch } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Sounds } from "#client/services/sounds";

export function useSoundVolume(prefix: string): [number, Dispatch<number>] {
  const [value, setValue] = useLocalStorage(
    prefix + "-volume",
    Sounds.defaultVolume,
  );

  return [value, setValue];
}
