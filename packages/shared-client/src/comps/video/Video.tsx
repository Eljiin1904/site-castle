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
  triggerKey?: any;
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
  resetEnd?: boolean;
};

export const Video: FC<VideoProps> = ({
  triggerKey,
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
  resetEnd = false,
  playBackSpeed = 1,
  altImage,
  altPadding = 0,
  ...forwardProps
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [videoSource, setVideoSource] = useState(`${config.staticURL}${path}.${type}`);

  const shouldHide = (loading && skeleton) || showFallback;

  useLayoutEffect(() => {
    setLoading(false);
    setShowFallback(false);
    setVideoSource(`${config.staticURL}${path}.${type}`);
  }, [path, triggerKey]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.load();
    video.play().catch((err) => {
      console.warn("Playback failed:", err.message);
    });
  }, [videoSource, triggerKey]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (play) {
      resetAndPlay();
    }

    if (pause) {
      videoRef.current.pause();
    }

    if (reset) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    if (resetPause) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [play, pause, reset, resetPause]);

  const resetAndPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.play().catch((error) => {
      console.error("Error playing video:", error);
    });
  };

  const setPlaybackSpeed = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playBackSpeed;
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Div
      className={classNames("Video", className, { hide: shouldHide })}
      style={{ ...style, width, height, aspectRatio }}
      overflow="hidden"
      {...forwardProps}
    >
      {showFallback && altImage && (
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
        key={triggerKey || path} // ensure re-mount on trigger change
        width={width}
        height={height}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        style={{
          objectFit,
          objectPosition: `${objectPositionHorizontal} ${objectPositionVertical}`,
        }}
        onCanPlay={setPlaybackSpeed}
        onError={() => {
          videoRef.current?.pause();
          setShowFallback(true);
        }}
        onEnded={resetEnd ? handleEnded : () => {}}
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
