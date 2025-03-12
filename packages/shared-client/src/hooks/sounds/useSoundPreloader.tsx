import { Sounds } from "#client/services/sounds";
import { useMount } from "../system/useMount";

export function useSoundPreloader(...ids: string[]) {
  useMount(() => {
    if (
      !("userActivation" in navigator) ||
      navigator.userActivation.hasBeenActive
    ) {
      Sounds.load(...ids);
    } else {
      const handle = () => {
        Sounds.load(...ids);
        window.removeEventListener("click", handle);
      };

      window.addEventListener("click", handle);
    }
  });
}
