import { DrawCard } from "./Deck";
import { BlackjackAction } from "#core/types/blackjack/BlackjackAction";
import { Card } from "./Card";
import { Hand, HandArg } from "./Hand";
import { CustomError } from "./Errors/CustomError";

type Arg = {
  hands?: DbCardHolderData["hands"];
};

type Opts = {
  drawCard: DrawCard;
  isGameCompleted: () => boolean;
};

export abstract class CardHolder {
  hands!: Hand[];
  protected drawCard: DrawCard; // need this stored for splitting

  protected isGameCompleted: () => boolean;

  constructor({ hands }: Arg = {}, { drawCard, isGameCompleted }: Opts) {
    this.drawCard = drawCard;
    this.isGameCompleted = isGameCompleted;
    this.setHands(hands);
  }

  setHands(hands: Arg["hands"]) {
    if (hands) {
      this.hands = hands.map((hand) => this.createHand(hand));
    } else {
      this.hands = [this.createHand({})];
    }
  }
  createHand(hand: HandArg) {
    return new Hand(hand, {
      drawCard: this.drawCard,
      isGameCompleted: this.isGameCompleted,
    });
  }

  // not sure why I did this
  // guessing it's only used for first deal
  // should be hands[0] not forEach?
  // addCard() {
  //   this.hands.forEach((hand) => hand.addCard());
  // }
  initDrawCard() {
    this.hands[0].addCard();
  }
  hasHandPlaying() {
    return this.hands.some((hand) => hand.isPlaying());
  }
  hasSomeHandsStanding() {
    return this.hands.some((hand) => hand.stand);
  }
  hasCards() {
    return this.hands.some((hand) => hand.hasCards());
  }

  async action(action: BlackjackAction) {
    if (!this.hasHandPlaying()) throw new Error("This user has no hands for action: " + action);

    const hand = this.getPlayingHand();
    await hand.action(action);
  }

  protected getPlayingHand() {
    const hand = this.tryGetPlayingHand();
    if (!hand) throw new CustomError("No hand is playing");
    return hand;
  }
  protected tryGetPlayingHand() {
    return this.hands.find((hand) => hand.isPlaying());
  }
  // get a TS error using protected here for some reason
  getHandHighValues() {
    return this.hands.map((hand) => hand.tryGetHighValue());
  }

  // === export ===
  getDbObj() {
    return {
      hands: this.hands.map((hand) => hand.getDbObj()),
    };
  }
  getClientObj({ hiddenCard, permHideCard }: { hiddenCard?: Card; permHideCard?: boolean }) {
    return {
      hands: this.hands.map((hand) =>
        hand.getClientObj({
          hiddenCard,
          permHideCard,
        }),
      ),
    };
  }

  // === sim/testing ===

  getString() {
    return this.hands.map((hand) => hand.getString()).join("  [2nd hand]:");
  }
}

export type DbCardHolderData = ReturnType<CardHolder["getDbObj"]>;
export type ClientCardHolderData = ReturnType<CardHolder["getClientObj"]>;
