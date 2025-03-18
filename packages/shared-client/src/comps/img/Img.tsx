import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import config from "#client/config";
import { SvgChicken } from "#client/svgs/common/SvgChicken";
import { Div } from "../div/Div";
import { Placeholder } from "../placeholder/Placeholder";
import { StyledLayoutProps, StyledProps } from "../styled/Styled";
import { Vector } from "../vector/Vector";
import "./Img.scss";

export type ImgProps = Omit<StyledLayoutProps, "width" | "height"> & {
  type: "png" | "jpg" | "external" | "local";
  path: string;
  width: string;
  height?: string;
  alt?: string;
  skeleton?: boolean;
  aspectRatio?: string;
  objectFit?: StyledProps["objectFit"];
  objectPositionVertical?: StyledProps["objectFitPosition"];
  objectPositionHorizontal?: StyledProps["objectFitPosition"];
};

export const Img: FC<ImgProps> = ({
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
  ...forwardProps
}) => {
  const [loading, setLoading] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const hide = (loading && skeleton) || showDefault;
  const isStatic = type === "png" || type === "jpg";
  const src = isStatic ? `${config.staticURL}${path}.${type}` : path;

  useLayoutEffect(() => {
    setLoading(false);
    setShowDefault(false);
  }, [path]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(!imageRef.current?.complete);
    });
  }, []);

  return (
    <Div
      className={classNames("Img", className, { hide })}
      style={{ ...style, width, height, aspectRatio }}
      {...forwardProps}
    >
      <img
        ref={imageRef}
        height={height}
        width={width}
        src={src}
        alt={alt}
        style={{ objectFit: `${objectFit}`,objectPosition: `${objectPositionHorizontal} ${objectPositionVertical}` }}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => {
          setLoading(false);
          setShowDefault(true);
        }}
      />
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
    </Div>
  );
};
