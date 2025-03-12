import { FC, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import classNames from "classnames";
import { Div } from "../div/Div";
import { StyledLayoutProps } from "../styled/Styled";

export type ImageCropperValue = {
  cropArea: Area;
};

export type ImageCropperProps = Omit<StyledLayoutProps, "width" | "height"> & {
  image: HTMLImageElement;
  height: string;
  aspect: number;
  value: ImageCropperValue | undefined;
  onChange: (v: ImageCropperValue) => void;
};

export const ImageCropper: FC<ImageCropperProps> = ({
  className,
  image,
  height,
  aspect,
  onChange,
  style,
  ...forwardProps
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  return (
    <Div
      className={classNames("ImageCropper", className)}
      fx
      style={{
        ...style,
        height,
      }}
      {...forwardProps}
    >
      <Cropper
        image={image.src}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={setCrop}
        onCropComplete={(area: Area, areaPixels: Area) =>
          onChange({ cropArea: areaPixels })
        }
        onZoomChange={setZoom}
      />
    </Div>
  );
};
