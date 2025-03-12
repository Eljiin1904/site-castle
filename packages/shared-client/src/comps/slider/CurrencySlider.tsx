import { FC } from "react";
import { Div } from "../div/Div";
import { RangeSlider } from "./RangeSlider";

export type CurrencySliderProps = {
  value: [number, number];
  maxValue: number;
  onChange: (x: [number, number]) => void;
};

export const CurrencySlider: FC<CurrencySliderProps> = ({
  value,
  maxValue,
  onChange,
}) => {
  // Map the real range values to the slider range (0-100)
  const mapToSliderValue = (n: number): number => {
    if (n <= 100) {
      // Map 0-100 to 0-25
      return (n / 100) * 25;
    } else if (n <= 1000) {
      // Map 100-1000 to 25-50
      const normalizedValue = (n - 100) / (1000 - 100);
      return 25 + normalizedValue * 25;
    } else if (n <= 10000) {
      // Map 1000-10000 to 50-75
      const normalizedValue = (n - 1000) / (10000 - 1000);
      return 50 + normalizedValue * 25;
    } else {
      // Map 10000-maxValue to 75-100
      const normalizedValue = (n - 10000) / (maxValue - 10000);
      return 75 + normalizedValue * 25;
    }
  };

  // Map the slider range (0-100) back to the real range
  const mapFromSliderValue = (sliderValue: number): number => {
    if (sliderValue <= 25) {
      // Map 0-25 to 0-100
      return (sliderValue / 25) * 100;
    } else if (sliderValue <= 50) {
      // Map 25-50 to 100-1000
      const normalizedSliderValue = (sliderValue - 25) / 25;
      return 100 + normalizedSliderValue * (1000 - 100);
    } else if (sliderValue <= 75) {
      // Map 50-75 to 1000-10000
      const normalizedSliderValue = (sliderValue - 50) / 25;
      return 1000 + normalizedSliderValue * (10000 - 1000);
    } else {
      // Map 75-100 to 10000-maxValue
      const normalizedSliderValue = (sliderValue - 75) / 25;
      return 10000 + normalizedSliderValue * (maxValue - 10000);
    }
  };

  // Adjust the range values when the slider changes
  const handleChange = (sliderValue: [number, number]) => {
    const adjusted = sliderValue.map(mapFromSliderValue) as [number, number];
    onChange(adjusted);
  };

  // Convert the initial value to slider values
  const getValue = (): [number, number] => {
    return value.map(mapToSliderValue) as [number, number];
  };

  return (
    <Div
      bg="gray-8"
      fx
      height={40}
      center
      px={16}
      border
    >
      <RangeSlider
        min={0}
        max={100}
        step={0.01}
        value={getValue()}
        onChange={handleChange}
      />
    </Div>
  );
};
