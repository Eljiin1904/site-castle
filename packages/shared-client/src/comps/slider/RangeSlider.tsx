import { FC } from "react";
import { SliderBase, SliderBaseProps } from "./SliderBase";

export type RangeSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  reverse?: boolean;
  disabled?: boolean;
  defaultValue?: [number, number];
  pushable?: boolean | number;
  value: [number, number];
  handleRender?: SliderBaseProps["handleRender"];
  onChange: (x: [number, number]) => void;
};

export const RangeSlider: FC<RangeSliderProps> = ({
  min = 1,
  max = 100,
  step = 1,
  reverse,
  disabled,
  defaultValue = [1, 20],
  pushable,
  value,
  handleRender,
  onChange,
}) => {
  return (
    <SliderBase
      range
      min={min}
      max={max}
      step={step}
      handleRender={handleRender}
      reverse={reverse}
      disabled={disabled}
      defaultValue={defaultValue}
      pushable={pushable}
      value={value}
      onChange={(x) => onChange(x as [number, number])}
    />
  );
};
