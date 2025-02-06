import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";
import lottie from "lottie-web/build/player/lottie_light";
import config from "#app/config";

interface LottieProps {
  className?: string;
  path: string;
  loop?: boolean;
  play?: boolean;
  speed?: number;
  width?: number;
  height?: number;
}

export const Lottie = ({
  className,
  path,
  loop,
  play = true,
  speed = 1,
  width,
  height,
}: LottieProps) => {
  const element = useRef<HTMLDivElement>(null);
  const instance = useRef<AnimationItem>();

  useEffect(() => {
    if (element.current) {
      instance.current = lottie.loadAnimation({
        path: `${config.staticURL}${path}`,
        loop,
        autoplay: false,
        container: element.current,
      });
    }
    return () => {
      instance.current?.destroy();
      instance.current = undefined;
    };
  }, [path, loop]);

  useEffect(() => {
    if (speed) {
      instance.current?.setSpeed(speed);
    }
  }, [speed]);

  useEffect(() => {
    if (play) {
      instance.current?.play();
    } else {
      instance.current?.stop();
    }
  }, [play]);

  return (
    <div
      className={className}
      ref={element}
      style={{ width, height }}
    />
  );
};
