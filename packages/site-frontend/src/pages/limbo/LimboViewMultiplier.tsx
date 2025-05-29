import { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Video } from "@client/comps/video/Video";

export const LimboViewMultiplier = () => {
  const ticket = useAppSelector((state) => state.limbo.lastTicket);
  const processing = useAppSelector((state) => state.limbo.processing);
  const isWin = ticket?.won;
  const isAutoPlaying = useAppSelector((state) => state.limbo.autoPlaying);
  const layout = useAppSelector((state) => state.style.mainLayout);
  const sm = layout === "mobile";

  const multiplier = ticket?.rollMultiplier ?? 1;
  const color = ticket ? (isWin ? "bright-green" : "double-red") : "light-sand";

  const animationMap = {
    win: "/graphics/animations/rocket_launch",
    lose: "/graphics/animations/fire_expl_fire",
    default: "/graphics/animations/rocket_launch",
  };

  const [animationPath, setAnimationPath] = useState(animationMap.default);
  const [triggerKey, setTriggerKey] = useState(Date.now());

  const valueRef = useRef<HTMLElement>(null);

  const counter = useCountUp({
    ref: valueRef,
    start: 1,
    end: Numbers.floor(multiplier, 2),
    delay: 0,
    decimals: 2,
    duration: 0.5,
  });

  useEffect(() => {
    counter.reset();
    counter.start();

    if (ticket?.won !== undefined) {
      setAnimationPath(isWin ? animationMap.win : animationMap.lose);
    } else {
      setAnimationPath(animationMap.default);
    }
    setTriggerKey(Date.now()); // Used to Rerender
  }, [ticket]);

  const shouldPlayVideo = Boolean(processing || isAutoPlaying);
  const shouldResetVideo = !processing;

  return (
    <Div
      className="LimboViewMultiplier"
      fx
      grow
      center
      alignItems="flex-start"
      px={sm ? 16 : 40}
    >
      <Video
        triggerKey={triggerKey} // Used to Rerender when same animation multiple times
        type="mp4"
        path={animationPath}
        skeleton
        width="100%"
        aspectRatio="16 / 9"
        position="absolute"
        loop={false}
        autoplay={false}
        muted
        controls={false}
        playBackSpeed={1}
        reset={false}
        play={shouldPlayVideo}
      />

      <Div mt={32}>
        <Span
          forwardRef={valueRef}
          family="title"
          weight="regular"
          color={color}
          size={sm ? 56 : 80}
          lineHeight={sm ? 56 : 80}
          style={ticket ? { transition: "color 250ms ease 150ms" } : undefined}
        >
          {"1.00"}
        </Span>
        <Span
          family="title"
          weight="regular"
          color={color}
          size={sm ? 56 : 80}
          lineHeight={sm ? 56 : 80}
          ml={sm ? 4 : 8}
          style={ticket ? { transition: "color 250ms ease 150ms" } : undefined}
        >
          {"X"}
        </Span>
      </Div>
    </Div>
  );
};
