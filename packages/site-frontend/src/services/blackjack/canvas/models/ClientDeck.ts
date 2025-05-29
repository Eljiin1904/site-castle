import { RenderArg } from "../helpers/Canvas";
import { CARD_DIMS, DECK_DIMS, DECK_POINT } from "../config";
import { deckImagePath } from "../utils/getCardImagePath";

export default class ClientDeck {
  image?: HTMLImageElement;

  constructor() {}

  draw(renderArg: RenderArg) {
    const { ctx } = renderArg;

    if (!this.image) throw new Error("Deck image not loaded");

    const x = DECK_POINT.x - CARD_DIMS.width / 2;

    // using card dims for now
    ctx.drawImage(this.image, x, DECK_POINT.y, DECK_DIMS.width, DECK_DIMS.height);
    // draw a bunch of cards
    // or just bottom fill rect
  }

  async loadImage() {
    if (this.image) return;

    // back should always be loaded
    // reloading a bunch is probably ok
    // (cached-- even if queued multiple times?)
    const image = new Image();
    image.src = deckImagePath;

    return new Promise((resolve) => {
      image.onload = () => {
        this.image = image;
        resolve(null);
      };
    });
  }
}
