import EventEmitter from "../../helpers/EventEmitter";
import { BlackjackOldInfo, Owner } from "../helpers/HandInfo";
import ClientHand from "../ClientHand";
import ClientCard from "../ClientCard";
import { RenderArg } from "../../helpers/Canvas";
import {
  BlackjackClientCardHolderData,
  BlackjackClientHandData,
  BlackjackClientPlayerHandData,
} from "#core/types/blackjack/BlackjackApiResponse";
import { Point } from "../../vectors/Point";

type Opts = {
  owner: Owner;
  events: EventEmitter;
};

export default class ClientCardHolder {
  protected hands: ClientHand[] = [];
  private events: EventEmitter;
  private owner: Owner;
  private _areHandsAnimating = false;

  constructor({ hands }: BlackjackClientCardHolderData, { events, owner }: Opts) {
    this.events = events;
    this.owner = owner;
    this.hands = hands.map((hand) => this.createHand(hand));
  }

  protected createHand(
    hand: BlackjackClientHandData,
    {
      splitCardPosition,
    }: {
      splitCardPosition?: Point;
    } = {},
  ) {
    // never made the subclass for ClientPlayerHand, hacking it here instead
    return new ClientHand(hand as BlackjackClientPlayerHandData, {
      owner: this.owner,
      events: this.events,
      splitCardPosition,
    });
  }

  update(data: BlackjackClientCardHolderData) {
    // event emitter persists beyond this point,
    // need to dismount events from old hand instances (atm: handInfo)
    if (this.hands) this.hands.forEach((hand) => hand.dismount());

    // gruesome but easiest
    // let oldInfoAr: BlackjackOldInfo[] = [];
    // if (this.hands && this.hands.length === data.hands.length) {
    //   oldInfoAr = this.hands.map((hand) => hand.getInfo());
    // }

    // TODO refactor
    // Should be on ClientPlayer not ClientCardHolder
    let splitCardPositions = [] as Point[];
    if (this.hands.length == 1 && data.hands.length == 2) {
      splitCardPositions = this.hands[0].getSplitCardPositions();
    }

    // overwriting instead of updating
    this.hands = data.hands.map((hand, i) =>
      this.createHand(hand, {
        // oldInfo: oldInfoAr[i],
        splitCardPosition: splitCardPositions[i],
      }),
    );
  }

  draw(renderArg: RenderArg) {
    this.hands.forEach((hand) => {
      return hand.draw(renderArg);
    });

    const areHandsAnimating = this.areCardsAnimating();
    if (!areHandsAnimating && this._areHandsAnimating) {
      this._areHandsAnimating = false;
      this.events.emit("hand-dealt", this.owner);
    }
  }

  setAnimating() {
    this._areHandsAnimating = true;
  }

  areCardsAnimating() {
    return this.hands.some((hand) => hand.areCardsAnimating());
  }
  hasCardsWithOrderIndex() {
    return this.hands.some((hand) => hand.hasCardsWithOrderIndex());
  }

  loadCardImages() {
    return Promise.all(this.hands.map((hand) => hand.loadCardImages()));
  }

  getNewCards() {
    const cards: ClientCard[] = [];
    this.hands.forEach((hand) => {
      cards.push(...hand.getNewCards());
    });
    return cards;
  }

  dismount() {
    this.hands.forEach((hand) => hand.dismount());
  }
}
