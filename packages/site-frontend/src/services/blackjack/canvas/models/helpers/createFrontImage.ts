import { BlackjackClientCardData } from "@core/types/blackjack/BlackjackApiResponse";
import { getSuitImage } from "./suitSvgs";
import { CARD_DIMS } from "../../config";
import loadSuitIcon from "./loadSuitIcon";

const RED_FONT = "#EB3000";

// stopped using this until I can figure out how to fix "tainted canvas" issue
export default async function ({ value, suit, hidden }: BlackjackClientCardData) {
  // null value should have been inferred, need to convert type back to Union
  if (hidden || value === null) return null;

  const drawing = document.createElement("canvas");
  // drawing.width = '150'
  // drawing.height = '150'
  const { width, height } = CARD_DIMS;
  drawing.width = width;
  drawing.height = height;

  const ctx = drawing.getContext("2d")!;

  // for shadow
  const margin = { x: 0, y: 0 };

  ctx.fillStyle = "#fff";
  ctx.roundRect(margin.x, margin.y, width - margin.x * 2, height - margin.y * 2, 5);
  ctx.fill();

  const pad = { x: 8, y: 8 };
  const suitImageWidth = 25;

  const text = value.toString();
  ctx.fillStyle = ["hearts", "diamonds"].includes(suit) ? RED_FONT : "#000";
  ctx.font = "36px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const textDim = ctx.measureText(text);
  const textHeight = textDim.fontBoundingBoxDescent;
  const textX = margin.x + pad.x + (suitImageWidth - textDim.width) / 2;
  const textY = margin.y + pad.y;

  ctx.fillText(text, textX, textY);

  // const suitImage = await loadSuitIcon(suit);
  const suitImage = await getSuitImage(suit);

  const aspect = suitImage.width / suitImage.height;
  const suitHeight = suitImageWidth / aspect;
  const yGap = 0;

  const suitX = margin.x + pad.x;
  const suitY = margin.y + pad.y + textHeight + yGap;

  ctx.drawImage(suitImage, suitX, suitY, suitImageWidth, suitHeight);

  const src = drawing.toDataURL("image/png");

  const img = new Image();
  img.src = src;
  return img;
}
