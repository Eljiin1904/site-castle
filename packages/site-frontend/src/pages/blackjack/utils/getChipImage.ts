// import config from "#app/config";
import { ChipValue } from "#app/services/blackjack/constants/chipValues";

const root = `/graphics/games/blackjack/chips`;

export const chipImages = {
  "0.1": `${root}/0.1`,
  "1": `${root}/1`,
  "5": `${root}/5`,
  "25": `${root}/25`,
  "100": `${root}/100`,
  "1000": `${root}/1000`,
};

export function getChipImage(value: ChipValue) {
  const str = value.toString() as keyof typeof chipImages;
  return chipImages[str];
}
