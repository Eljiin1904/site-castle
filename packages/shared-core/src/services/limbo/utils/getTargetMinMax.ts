import { getTargetFromMultiplier } from "./getTargetFromMultiplier";

export function getTargetMinMax(): {
  min: number;
  max: number;
} {
  return {
    min: getTargetFromMultiplier(1.01),
    max: getTargetFromMultiplier(1000000),
  };
}
