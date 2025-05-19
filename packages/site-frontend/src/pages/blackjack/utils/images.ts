import config from "#app/config";
import { isWebPSupported } from "#app/services/blackjack/canvas/utils/detectWebP";
import { backImagePath } from "#app/services/blackjack/canvas/utils/getCardImagePath";
import { values } from "#client/services/utility/Utility";
import { convertPathToWebp } from "./convertPathToWebp";
import { chipImages } from "./getChipImage";

const root = `${config.staticURL}/games/blackjack`;

export const imagePaths = {
  // bgGreen: `${root}/background/bg-green-v3-cropped.jpg`,
  // bgBlack: `${root}/background/bg-dark-v3-cropped.jpg`,
  logo: `${root}/background/chicken-logo.png`,
};
export const svgPaths = {
  bgDark: `${root}/background/dark-bg-v2.svg`,
  bgGreen: `${root}/background/green-bg-v2.svg`,
};

let preloaded = false;
export function preloadBlackjackImages() {
  if (preloaded) return;
  preloaded = true;
  values({
    ...imagePaths,
    ...chipImages,
    backImagePath,
  })
    .map((src) => (isWebPSupported ? convertPathToWebp(src) : src))
    .forEach((src) => {
      const img = new Image();
      img.src = src;
    });
}
