import { keys } from "#core/services/utility/Utility";

export function tweenValObj<T extends Partial<Record<string, number>>>(
  startObj: T,
  endObj: T,
  progress: number,
) {
  const obj: Partial<Record<keyof T, number>> = {};

  keys(startObj).forEach((key) => {
    const startVal = startObj[key];
    const endVal = endObj[key];

    // can't figure out how to do this without a Partial
    if (startVal === undefined || endVal === undefined)
      throw new Error("startVal or endVal is undefined");

    const diff = endVal - startVal;

    const curVal = startVal + diff * progress;
    obj[key] = curVal;
  });

  return obj;
}
