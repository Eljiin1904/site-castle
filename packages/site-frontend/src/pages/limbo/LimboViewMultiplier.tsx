import { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Video } from "@client/comps/video/Video";

export const LimboViewMultiplier = () => {
  const ticket = useAppSelector((x) => x.limbo.lastTicket);
  const processing = useAppSelector((x) => x.limbo.processing);
  const isWin = useAppSelector((x) => x.limbo.lastTicket?.won);
  const isAutoPlaying = useAppSelector((x) => x.limbo.autoPlaying);
  const animationOptions = {
    win: "/graphics/animations/rocket_launch_still",
    lose: "/graphics/animations/rocket_expl_fire",
    default: "/graphics/animations/rocket_fast",
  };
  const [rocketAnimation, setRocketAnimation] = useState(animationOptions["default"]);

  const layout = useAppSelector((x) => x.style.mainLayout);
  const sm = layout === "mobile";
  const valueRef = useRef<HTMLElement>(null);

  const multiplier = ticket ? ticket.rollMultiplier : 1;
  const color = ticket ? (ticket.won ? "bright-green" : "double-red") : "light-sand";

  const counter = useCountUp({
    ref: valueRef,
    start: 1,
    end: Numbers.floor(multiplier, 2),
    delay: 0,
    decimals: 2,
    duration: 0.5,
  });

  useEffect(() => {
    setRocketAnimation(animationOptions["default"]);
    counter.reset();
    counter.start();

    if (ticket?.won != undefined) {
      setRocketAnimation(
        ticket?.won
          ? animationOptions["win"]
          : !isWin
            ? animationOptions["lose"]
            : animationOptions["default"],
      );
    }
  }, [multiplier]);

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
        type="mp4"
        path={rocketAnimation}
        skeleton
        width="100%"
        aspectRatio={"16 / 9"}
        position="absolute"
        loop={false}
        autoplay={processing || isAutoPlaying}
        muted={true}
        controls={false}
        playBackSpeed={8}
        reset={!processing}
        play={(processing != undefined && processing) || isAutoPlaying}
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
