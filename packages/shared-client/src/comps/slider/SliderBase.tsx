import { FC } from "react";
import Slider, { SliderProps } from "rc-slider";
import "rc-slider/assets/index.css";
import "./SliderBase.scss";

export type SliderBaseProps = SliderProps;

export const SliderBase: FC<SliderBaseProps> = (props) => {
  return (
    <Slider
      className="Slider"
      {...props}
    />
  );
};
