import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import config from "#client/config";
import { Div } from "../div/Div";
import { Placeholder } from "../placeholder/Placeholder";
import { StyledLayoutProps, StyledProps } from "../styled/Styled";
import { Img } from "../img/Img";
import "./Video.scss";

type PlayBackRate = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8;
export type VideoProps = Omit<StyledLayoutProps, "width" | "height"> & {
  type: "mp4" | "mov";
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
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  play?: boolean;
  pause?: boolean;
  reset?: boolean;
  resetPause?: boolean;
  playBackSpeed: PlayBackRate;
  altImage?: string;
  altPadding?: number;
  scale?: number;
};

export const Video: FC<VideoProps> = ({
  className,
  type,
  path,
  width,
  height = width,
  alt = "video",
  style,
  skeleton,
  aspectRatio,
  objectFit = "cover",
  objectPositionVertical = "center",
  objectPositionHorizontal = "center",
  loop = false,
  autoplay = true,
  muted = true,
  controls = true,
  play = false,
  pause = false,
  reset = false,
  resetPause = false,
  playBackSpeed = 1,
  altImage,
  altPadding = 0,
  ...forwardProps
}) => {
  const [loading, setLoading] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hide = (loading && skeleton) || showDefault;
  const [videoSource, setVideoSource] = useState(`${config.staticURL}${path}.${type}`);

  useLayoutEffect(() => {
    setLoading(false);
    setShowDefault(false);
    setVideoSource(`${config.staticURL}${path}.${type}`);
  }, [path]);

  // Handles Dynamic Reset of Video Source
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    video.load();
    video.play().catch((err) => {
      console.warn("Play blocked or failed:", err.message);
    });
  }, [videoSource]);

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
  }, [play, pause, reset, resetPause]);

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
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
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
      overflow="hidden"
      {...forwardProps}
    >
      {showDefault && altImage && (
        <Img
          className="alt-image"
          type="png"
          path={altImage}
          width={width}
          height={height}
          style={{ padding: `${altPadding}px` }}
        />
      )}
      <video
        ref={videoRef}
        key={videoSource}
        height={height}
        width={width}
        controls={controls}
        autoPlay={autoplay}
        muted={muted} // Muted has to be true for autoplay to work
        loop={loop}
        style={{
          objectFit: `${objectFit}`,
          objectPosition: `${objectPositionHorizontal} ${objectPositionVertical}`,
        }}
        onCanPlay={() => setPlayBack()}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => {
          pauseVideo();
          setShowDefault(true);
        }}
        onEnded={() => {
          if (reset) resetVideo();
        }}
      >
        <source
          src={videoSource}
          type={`video/${type}`}
        />
        {loading && skeleton && <Placeholder />}
      </video>
    </Div>
  );
};
