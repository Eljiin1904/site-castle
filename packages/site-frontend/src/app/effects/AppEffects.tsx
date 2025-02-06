import { useEffect, useRef } from "react";
import { useEventCallback } from "usehooks-ts";
import type { Container } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import { Div } from "@client/comps/div/Div";
import { Effects } from "#app/services/effects";
import { Position } from "#app/services/effects/classes/EffectManager";
import { defaultOptions } from "./defaultOptions";

export const AppEffects = () => {
  const container = useRef<Container>();
  const ref = useRef<HTMLDivElement>(null);

  const handleLoaded = useEventCallback(async (x: Container | undefined) => {
    container.current = x;
  });

  useEffect(() => {
    const handler = async (positions: Position[]) => {
      if (!container.current) {
        return;
      }

      const emitters = [];

      for (const position of positions) {
        emitters.push({
          ...defaultOptions.emitters,
          position,
        });
      }

      await container.current.reset({ ...defaultOptions, emitters });
      await container.current.refresh();

      container.current.play();
    };

    Effects.manager.on("play", handler);

    return () => {
      Effects.manager.off("play", handler);
    };
  }, []);

  useEffect(() => {
    const handler = () => {
      container.current?.stop();
    };

    Effects.manager.on("stop", handler);

    return () => {
      Effects.manager.off("stop", handler);
    };
  }, []);

  return (
    <Div
      forwardRef={ref}
      zIndex={4}
    >
      <Particles
        id="app-confetti"
        className="particles"
        options={defaultOptions}
        particlesLoaded={handleLoaded}
      />
    </Div>
  );
};
