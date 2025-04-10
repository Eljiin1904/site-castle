import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import config from "#client/config";
import { SvgChicken } from "#client/svgs/common/SvgChicken";
import { Div } from "../div/Div";
import { Placeholder } from "../placeholder/Placeholder";
import { StyledLayoutProps, StyledProps } from "../styled/Styled";
import { Vector } from "../vector/Vector";
import "./Video.scss";

export type VideoProps = Omit<StyledLayoutProps, "width" | "height"> & {
  type: "mp4" | "mov" | "avi";
  path: string;
  width: string;
  height?: string;
  alt?: string;
  skeleton?: boolean;
  aspectRatio?: string;
  objectFit?: StyledProps["objectFit"];
  objectPositionVertical?: StyledProps["objectFitPosition"];
  objectPositionHorizontal?: StyledProps["objectFitPosition"];
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  play?: boolean;
  pause?: boolean;
  reset?: boolean;
  resetPause?: boolean;
  playBackSpeed: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4;
};

export const Video: FC<VideoProps> = ({
  className,
  type,
  path,
  width,
  height = width,
  alt = "image",
  style,
  skeleton,
  aspectRatio,
  objectFit = "cover",
  objectPositionVertical = "center",
  objectPositionHorizontal = "center",
  loop = false,
  autoPlay = true,
  muted = true,
  controls = true,
  play = false,
  pause = false,
  reset = false,
  resetPause = false,
  playBackSpeed = 1,
  ...forwardProps
}) => {
  const [loading, setLoading] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hide = (loading && skeleton) || showDefault;
  const isStatic = type === "mp4" || type === "mov";
  const src = isStatic ? `${config.staticURL}${path}.${type}` : path;

  useLayoutEffect(() => {
    setLoading(false);
    setShowDefault(false);
  }, [path]);

  useEffect(() => {
    if (videoRef.current) {
      if (play) {
        resetVideo();
        playVideo();
      }
      if (pause) {
        pauseVideo();
      }
      if (resetPause) {
        resetVideo();
        pauseVideo();
      }
      if (reset) {
        resetVideo();
      }
    }
  }, [videoRef, play, pause, reset, resetPause]);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current?.play().catch((error) => {
        console.log(`Error attempting to play: ${error}`);
      });
    }
  };
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current?.pause();
    }
  };
  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };
  const setPlayBack = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playBackSpeed;
    }
  };

  return (
    <Div
      className={classNames("Video", className, { hide })}
      style={{ ...style, width, height, aspectRatio }}
      {...forwardProps}
    >
      <video
        ref={videoRef}
        height={height}
        width={width}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted} // Muted has to be true for autoplay to work
        loop={loop}
        style={{
          objectFit: `${objectFit}`,
          objectPosition: `${objectPositionHorizontal} ${objectPositionVertical}`,
        }}
        onCanPlay={() => setPlayBack()}
        onError={() => {
          pauseVideo();
          setShowDefault(true);
        }}
      >
        <source src={src} />
        {loading && skeleton && <Placeholder />}
        {showDefault && (
          <Div
            center
            fx
            fy
            p={24}
            bg="brown-6"
          >
            <Vector
              as={SvgChicken}
              width="100%"
              height="100%"
              color="brown-5"
              style={{ height: "100%" }}
            />
          </Div>
        )}
      </video>
    </Div>
  );
};
