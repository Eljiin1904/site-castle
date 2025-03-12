import { FC } from "react";
import { SliderBase, SliderBaseProps } from "./SliderBase";

export type SingleSliderProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  reverse?: boolean;
  disabled?: boolean;
  value: number;
  handleRender?: SliderBaseProps["handleRender"];
  onChange: (x: number) => void;
};

export const SingleSlider: FC<SingleSliderProps> = ({
  min = 1,
  max = 100,
  defaultValue = 50,
  reverse = false,
  disabled,
  value,
  handleRender,
  onChange,
}) => {
  return (
    <SliderBase
      min={min}
      max={max}
      defaultValue={defaultValue}
      reverse={reverse}
      disabled={disabled}
      value={value}
      handleRender={handleRender}
      onChange={(x) => onChange(x as number)}
    />
  );
};
