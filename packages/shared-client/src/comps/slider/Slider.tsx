import { FC } from "react";
import { SingleSlider, SingleSliderProps } from "./SingleSlider";
import { RangeSlider, RangeSliderProps } from "./RangeSlider";
import { CurrencySlider, CurrencySliderProps } from "./CurrencySlider";

export type SliderProps =
  | ({ type: "single" } & SingleSliderProps)
  | ({ type: "range" } & RangeSliderProps)
  | ({ type: "currency" } & CurrencySliderProps);

export const Slider: FC<SliderProps> = (props) => {
  if (props.type === "single") {
    const { type, ...forwardProps } = props;
    return <SingleSlider {...forwardProps} />;
  } else if (props.type === "range") {
    const { ...forwardProps } = props;
    return <RangeSlider {...forwardProps} />;
  } else {
    const { ...forwardProps } = props;
    return <CurrencySlider {...forwardProps} />;
  }
};
