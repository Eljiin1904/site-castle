import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import config from "#client/config";
import { Div } from "../div/Div";
import { Placeholder } from "../placeholder/Placeholder";
import { StyledLayoutProps } from "../styled/Styled";
import { Img } from "../img/Img";
import "./Video.scss";

export type VideoProps = Omit<StyledLayoutProps, "width" | "height"> & {
  type: "mp4" | "mov";
  path: string;
  width: string;
  height?: string;
  alt?: string;
  skeleton?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
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
  autoplay = false,
  loop = false,
  muted = false,
  altImage,
  altPadding = 0,
  ...forwardProps
}) => {
  const [loading, setLoading] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hide = (loading && skeleton) || showDefault;
  const src =  `${config.staticURL}${path}.${type}`;

  useLayoutEffect(() => {
    setLoading(false);
    setShowDefault(false);
  }, [path]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(!videoRef.current?.canPlayType(type));
    });
  }, []);

  return (
    <Div
      className={classNames("Video", className, { hide })}
      style={{ ...style, width, height, aspectRatio }}
      {...forwardProps}
    >
      {showDefault &&  altImage && (
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
        height={height}
        width={width}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        src={src}
        onLoad={() => {
          setLoading(false);
          alert("Video loaded");
        }}
        onError={() => {
          setLoading(false);
          setShowDefault(true);
        }}
      >
        <source src={src} type={`video/${type}`} />
        {loading && skeleton && <Placeholder />}
      </video>
    </Div>
  );
};
