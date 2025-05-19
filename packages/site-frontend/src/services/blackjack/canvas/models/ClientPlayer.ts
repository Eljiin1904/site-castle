import { BlackjackClientPlayerData } from "#core/types/blackjack/BlackjackApiResponse";
import { BlackjackBetAmounts } from "#core/types/blackjack/BlackjackBetAmounts";
import { CanvasPositionOpts } from "../helpers/Canvas";
import EventEmitter from "../helpers/EventEmitter";
import ClientCardHolder from "./abstract/ClientCardHolder";

type Opts = {
  events: EventEmitter;
};

export default class ClientPlayer extends ClientCardHolder {
  private betAmounts: BlackjackBetAmounts;
  displayBetAmounts: BlackjackBetAmounts;

  constructor(data: BlackjackClientPlayerData, opts: Opts) {
    super(data, { owner: "player", ...opts });
    this.betAmounts = data.betAmounts;
    this.displayBetAmounts = data.displayBetAmounts;
  }

  // override update(data: ClientCardHolderData) {
  //   // split
  //   if (this.hands.length !== data.hands.length) {
  //     this.hands = data.hands.map((hand) => this.createHand( hand ));
  //     return;
  //   }
  //   super.update(data)
  // }

  updatePositions({ getCanvasAnchorPoint }: CanvasPositionOpts) {
    const startPoint = getCanvasAnchorPoint("bottom", "center", { y: -200 });

    const gap = 300;
    const halfGap = gap / 2;
    const xOffset = (this.hands.length - 1) * halfGap;

    // split starts on left side?
    // const hands = [...this.hands].reverse();

    this.hands.forEach((hand, i) => {
      const x = startPoint.x + i * gap - xOffset;
      return hand.updatePosition({ x: x, y: startPoint.y }, ["bottom", "center"]);
    });
    super.setAnimating();
  }
}
