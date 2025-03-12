import { Sounds } from "#client/services/sounds";
import { useEffect, useState } from "react";
import { useSoundVolume } from "./useSoundVolume";

export function useSoundPlayer(prefix: string) {
  const [volume] = useSoundVolume(prefix);
  const [soundId, setSoundId] = useState("");

  useEffect(() => {
    if (soundId) {
      // allows volume to be updated in real-time
      // by the react hook rather than only at
      // call-time of Sounds.play()
      Sounds.updateVolume(soundId, volume);
    }
  }, [volume, soundId]);

  const play = (id: string) => {
    setSoundId(id); // ties in to above useEffect hook
    Sounds.play(id, volume);
  };

  return play;
}
