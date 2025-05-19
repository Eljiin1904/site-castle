import { backImagePath, getCardImagePath } from "../utils/getCardImagePath";
import { RenderArg } from "../helpers/Canvas";
import { Point } from "../vectors/Point";
import Rect from "../vectors/Rect";
import { Anchor } from "../vectors/Dims";
import Modifiers from "../helpers/Modifiers/Modifiers";
import {
  CARD_DIMS,
  CARD_FLIP_DELAY,
  CARD_FLIP_TIME,
  CARD_MOVE_TIME,
  DECK_POINT,
  DELAY_PER_CARD,
  SPLIT_CARD_MOVE_TIME,
} from "../config";
import { loadImage } from "../utils/loadImage";
import { BlackjackClientCardData } from "#core/types/blackjack/BlackjackApiResponse";
import EventEmitter from "../helpers/EventEmitter";
import createFrontImage from "./helpers/createFrontImage";

type DisplaySide = "front" | "back";

export default class ClientCard {
  static backImage: HTMLImageElement | undefined;
  static async loadBackImage() {
    if (this.backImage) return;
    const backImage = await loadImage(backImagePath);
    this.backImage = backImage;
    // return backImage
  }

  private displaySide: DisplaySide = "back";
  private data!: BlackjackClientCardData;
  protected frontImage: HTMLImageElement | undefined | null;
  private events: EventEmitter;
  private splitCardPosition?: Point;

  private rect = new Rect(CARD_DIMS);
  private modifiers = new Modifiers();

  constructor(data: BlackjackClientCardData, { events }: { events: EventEmitter }) {
    this.events = events;
    this.update(data);
  }

  get hidden() {
    return this.data.hidden;
  }
  private get shouldHide() {
    return this.data.shouldHide;
  }
  get value() {
    return this.data.value;
  }

  update(data: BlackjackClientCardData) {
    this.data = data;
  }

  async draw({ ctx, setAnimating }: RenderArg, { isCurrentHand }: { isCurrentHand: boolean }) {
    // if (!ClientCard.backImage) throw new Error("Back image not loaded")
    this.assertImages();

    setAnimating(this.isAnimating());

    ctx.save();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgb(0 0 0 / 50%)";
    if (!isCurrentHand) {
      // ctx.shadowBlur = 20;
      // ctx.shadowColor = "#00f";
      ctx.filter = "brightness(0.6)";
    }
    // ctx.shadowColor = "#000";
    ctx.drawImage(this.image, ...this.rect.getCanvasArgs());
    ctx.restore();
  }

  // this method needs refactor
  updatePosition(point: Point, anchor: Anchor) {
    this.rect.setPosition(point, anchor);

    const orderIndex = this.data?.orderIndex;
    const hiddenFlipIndex = this.data?.hiddenFlipIndex;
    if (orderIndex !== undefined) {
      // skipping display none modifier

      const msDelta = (orderIndex + 0) * DELAY_PER_CARD;

      setTimeout(() => {
        this.events.emit("card-dealt");
      }, msDelta);

      // hidden card will have orderIndex if just unhidden
      // but doesn't have to move
      // if (this.data.hidden || !this.shouldHide) {
      // move card from deck
      this.rect.addTransformer({
        applyDuringDelay: true,
        startValues: {
          x: DECK_POINT.x - point.x,
          y: DECK_POINT.y - point.y,
        },
        endValues: { x: 0, y: 0 },
        duration: CARD_MOVE_TIME,
        delay: msDelta,
      });
      // }

      // if (!this.data.hidden) this.flipCardAnim(msDelta);
      if (!this.data.shouldHide) this.flipCardAnim(msDelta);
      // TODO get rid of undefined
    }
    if (hiddenFlipIndex !== undefined) {
      const msDelta = hiddenFlipIndex * DELAY_PER_CARD;
      this.flipCardAnim(msDelta);
    }
    if (orderIndex == undefined && hiddenFlipIndex == undefined) {
      this.displaySide = "front";
    }

    if (this.splitCardPosition) {
      this.rect.addTransformer({
        startValues: {
          x: this.splitCardPosition.x - point.x,
          // skipping anchoring
          y: this.splitCardPosition.y - point.y + CARD_DIMS.height,
        },
        endValues: { x: 0, y: 0 },
        duration: SPLIT_CARD_MOVE_TIME,
      });
    }
  }

  private flipCardAnim(delay = 0) {
    const flipDelay = delay + CARD_FLIP_DELAY + CARD_FLIP_TIME / 2;
    setTimeout(() => {
      this.events.emit("card-flipped");
    }, flipDelay);

    // flip side image after delay
    this.modifiers.addModifier({
      delay: flipDelay,
      modifier: () => {
        this.displaySide = "front";
      },
    });

    // shrink width for back side
    this.rect.addTransformer({
      // applyDuringDelay: true,
      startValues: {
        width: 0,
        x: 0, // -this.rect.dim.width
      },
      endValues: {
        width: -this.rect.dim.width,
        x: this.rect.dim.width / 2,
      },
      duration: 1 + CARD_FLIP_TIME / 2, // adding +1 ms overlap for rounding error
      delay: delay + CARD_FLIP_DELAY,
    });

    // grow width for front side
    this.rect.addTransformer({
      startValues: {
        width: -this.rect.dim.width,
        x: this.rect.dim.width / 2,
      },
      endValues: {
        width: 0,
        x: 0,
      },
      duration: CARD_FLIP_TIME / 2,
      delay: delay + CARD_FLIP_DELAY + CARD_FLIP_TIME / 2,
    });
  }

  private assertImages(): asserts this is { image: HTMLImageElement } {
    // allowing it to be null for hidden card
    if (this.frontImage === undefined)
      throw new Error(`Front Image not loaded ` + JSON.stringify(this.data));
    if (!ClientCard.backImage)
      throw new Error(`Back Image not loaded ` + JSON.stringify(this.data));
  }

  protected get image() {
    // if (this.displaySide == "front" && !this.frontImage) throw new Error("Front image not loaded " + JSON.stringify(this.data))
    if (this.hidden) return ClientCard.backImage;
    return this.displaySide === "front" ? this.frontImage : ClientCard.backImage;
  }

  async loadImage() {
    if (ClientCard.backImage && this.frontImage !== undefined) return;

    // const frontP = loadImage(getCardImagePath(this.data));
    const frontP = createFrontImage(this.data);

    const [frontImage] = await Promise.all([
      this.hidden
        ? Promise.resolve(null)
        : // : getCardImagePath(this.data),
          frontP,
      ClientCard.loadBackImage(),
    ]);
    this.frontImage = frontImage;
  }

  isNew() {
    return this.data.orderIndex !== undefined;
    // return this.rect.isAnimating()
  }
  isAnimating() {
    return this.rect.isAnimating() || this.modifiers.isAnimating();
  }
  hasOrderIndex() {
    return this.data.orderIndex !== undefined || this.data.hiddenFlipIndex !== undefined;
  }
  getPosition() {
    return this.rect.point;
  }
  setSplitCardPosition(point?: Point) {
    if (point) this.splitCardPosition = point;
  }
}
