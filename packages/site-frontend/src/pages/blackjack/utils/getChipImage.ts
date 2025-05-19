import config from "#app/config";
import { ChipValue } from "#app/services/blackjack/constants/chipValues";

const root = `${config.staticURL}/games/blackjack/chips/no-text`;

export const chipImages = {
  "0.1": `${root}/0.1.png`,
  "1": `${root}/1.png`,
  "5": `${root}/5.png`,
  "25": `${root}/25.png`,
  "100": `${root}/100.png`,
  "1000": `${root}/1000.png`,
};

export function getChipImage(value: ChipValue) {
  const str = value.toString() as keyof typeof chipImages;
  return chipImages[str];
}
