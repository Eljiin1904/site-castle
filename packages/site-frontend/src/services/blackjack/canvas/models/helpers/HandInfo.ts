import { Point } from "../../vectors/Point";
import { RenderArg } from "../../helpers/Canvas";
import EventEmitter from "../../helpers/EventEmitter";
import { CARD_DIMS } from "../../config";
import { BlackjackHandInfo } from "#core/types/blackjack/BlackjackApiResponse";
import { BlackjackHandPayout } from "#core/types/blackjack/BlackjackHandPayout";

export type Owner = "player" | "dealer";
type Opts = {
  owner: HandInfo["owner"];
  events: EventEmitter;
  payout: HandInfo["payout"];
  getCurHandValues: () => number[];
};

const WIN_COLOR = "rgb(6, 165, 73)";
const TIE_COLOR = "rgb(161, 84, 0)";
const LOSE_COLOR = "rgb(195, 25, 10)";

type OldInfo = {
  info: BlackjackHandInfo;
  payout: BlackjackHandPayout | null;
};
export type BlackjackOldInfo = OldInfo;

export default class HandInfo {
  private point?: Point;
  private owner: Owner;
  // private hidden = true;
  private gameHasFinishedDealing = false;
  info!: BlackjackHandInfo;
  private events: EventEmitter;
  private payout: BlackjackHandPayout | null;
  private getCurHandValues: () => number[];

  constructor(info: BlackjackHandInfo, { payout, owner, events, getCurHandValues }: Opts) {
    this.owner = owner;
    this.events = events;
    this.payout = payout;
    this.getCurHandValues = getCurHandValues;

    this.addEvents();

    this.info = info;
  }

  private gameFinishedDealing() {
    this.gameHasFinishedDealing = true;
  }

  updatePosition(point: Point) {
    this.point = point;
  }

  draw(renderArg: RenderArg) {
    const { ctx, setAnimating } = renderArg;

    if (!this.point) throw new Error("HandInfo point not set");

    const finished = this.gameHasFinishedDealing;

    // if (this.showOldInfo && !this.oldInfo) {
    if (!finished) {
      setAnimating(true);
    }

    const values = this.getCurHandValues();

    if (!values.length) {
      return;
    }

    // let info = this.info;
    let payout = this.payout;

    // const { handValues } = info;
    const text = values.join(", ");

    const pad = { x: 10, y: 6 };
    const yGap = 15;
    let newY = this.point.y;
    if (this.owner == "player") {
      newY -= CARD_DIMS.height;
    }
    const halfCardWidth = CARD_DIMS.width / 2;
    const newX = this.point.x - halfCardWidth;

    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const textDim = ctx.measureText(text);

    // guessing because it looks right:
    const textHeight = textDim.fontBoundingBoxDescent;

    let bgColor =
      payout && this.gameHasFinishedDealing
        ? payout.result === "win"
          ? WIN_COLOR
          : payout.result === "tie"
            ? TIE_COLOR
            : LOSE_COLOR
        : "rgba(0,0,0,0.8)";

    // for dealer bust, because payout is unavail atm
    if (finished && Math.min(...values) > 21) bgColor = LOSE_COLOR;

    ctx.fillStyle = bgColor;
    ctx.fillRect(
      newX,
      newY - yGap - textHeight - pad.y,
      textDim.width + pad.x * 2,
      textHeight + pad.y * 2,
    );

    ctx.fillStyle = "white";
    ctx.fillText(text, newX + pad.x, newY - yGap - textHeight);
  }

  private dismountFns: Function[] = [];

  private addEvents() {
    const fn = this.gameFinishedDealing.bind(this);
    this.events.on("cards-dealt", fn);
    this.dismountFns.push(() => this.events.off("cards-dealt", fn));
  }

  // for old hand values on new instance creation
  // getInfo() {
  //   return {
  //     info: this.info,
  //     payout: this.payout,
  //   };
  // }

  dismount() {
    this.dismountFns.forEach((fn) => fn());
  }
}
