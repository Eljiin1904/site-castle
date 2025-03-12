import { FC } from "react";
import classNames from "classnames";
import { StyledLayoutProps } from "../styled/Styled";
import { Div } from "../div/Div";
import { Img } from "../img/Img";
import { Span } from "../span/Span";
import "./ImageInput.scss";

export type ImageInputValue = {
  path: string;
  file: File;
  image: HTMLImageElement;
};

export type ImageInputProps = Omit<StyledLayoutProps, "width" | "height"> & {
  width: string;
  height: string;
  accept: ".png" | ".jpg, .jpeg" | ".png, .jpg, .jpeg";
  placeholder: {
    type: "png" | "jpg" | "external";
    path: string;
  };
  value: ImageInputValue | undefined;
  disabled?: boolean;
  error?: string;
  onChange: (v: ImageInputValue) => void;
};

export const ImageInput: FC<ImageInputProps> = ({
  className,
  width,
  height,
  accept,
  placeholder,
  value,
  disabled,
  error,
  onChange,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("ImageInput", className, {
        disabled,
        error: error !== undefined,
      })}
      {...forwardProps}
    >
      <label htmlFor="img-input">
        <Div className="input-preview">
          <Img
            type={value?.path ? "local" : placeholder.type}
            path={value?.path || placeholder.path}
            width={width}
            height={height}
          />
          {error && (
            <Span
              className="error-text"
              fontSize={12}
            >
              {error}
            </Span>
          )}
        </Div>
      </label>
      <input
        type="file"
        id="img-input"
        accept={accept}
        disabled={disabled}
        onChange={(e) => {
          if (e.target.files != null && e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = window.URL.createObjectURL(file);
            const image = new Image();
            image.src = url;
            image.onload = () => onChange({ file, image, path: url });
          }
        }}
      />
    </Div>
  );
};
