import { initParticlesEngine } from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import { useMount } from "@client/hooks/system/useMount";

export function useAppParticles() {
  useMount(async () => {
    await initParticlesEngine(async (engine) => {
      await loadConfettiPreset(engine);
    });
  });

  return null;
}
