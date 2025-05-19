import { BlackjackClientCardHolderData } from "#core/types/blackjack/BlackjackApiResponse";
import { CanvasPositionOpts } from "../helpers/Canvas";
import EventEmitter from "../helpers/EventEmitter";
import ClientCardHolder from "./abstract/ClientCardHolder";

type Opts = {
  events: EventEmitter;
};

export default class ClientDealer extends ClientCardHolder {
  constructor(data: BlackjackClientCardHolderData, opts: Opts) {
    super(data, { owner: "dealer", ...opts });
  }

  get hand() {
    const hand = this.hands[0];
    if (!hand) throw new Error("Dealer has no hand");
    return hand;
  }

  // update(...args: Parameters<ClientCardHolder["update"]>) {
  //   super.update(...args);
  // }

  updatePositions({ getCanvasAnchorPoint }: CanvasPositionOpts) {
    const startPoint = getCanvasAnchorPoint("top", "center", { y: 100 });
    this.hand.updatePosition(startPoint, ["top", "center"]);
    super.setAnimating();
  }
}
