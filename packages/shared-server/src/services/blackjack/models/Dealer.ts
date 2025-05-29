import { CardHolder } from "./CardHolder";
import { CustomError } from "./Errors/CustomError";

type SuperArgs = ConstructorParameters<typeof CardHolder>;

type Opts = {
  didAllPlayersBust: () => boolean;
  didAllPlayersBlackjack: () => boolean;
} & SuperArgs[1];

export class Dealer extends CardHolder {
  didAllPlayersBust: () => boolean;
  didAllPlayersBlackjack: () => boolean;

  constructor(data: SuperArgs[0], { didAllPlayersBust, didAllPlayersBlackjack, ...opts }: Opts) {
    super(data, opts);
    this.didAllPlayersBust = didAllPlayersBust;
    this.didAllPlayersBlackjack = didAllPlayersBlackjack;
  }

  get hand() {
    if (this.hands.length !== 1) throw new CustomError("Dealer should only have one hand");
    return this.hands[0];
  }

  get hiddenCard() {
    return this.hand.cards[1];
  }
  get upCard() {
    return this.hand.cards[0];
  }

  async decisionLoop() {
    const hand = this.hand;
    if (hand.stand || hand.hasBusted()) return;

    const highVal = hand.getHighValue();

    // not sure if I should be using actions for dealer
    if (highVal < 17) {
      await hand.action("hit");
      await this.decisionLoop();
    } else {
      await hand.action("stand");
    }
  }

  addOrderIndexToHiddenCard(getNextIndex: () => number) {
    // build some suspence
    // too much
    // getNextIndex();
    // getNextIndex();
    // getNextIndex();

    const index = getNextIndex();
    this.hiddenCard.setHiddenFlipIndex(index);
  }

  hasBlackjack() {
    return this.hand.hasBlackjack();
  }
  hasAceUp() {
    return this.upCard.isAce();
  }
  getStatus() {
    return this.hand.getStatus();
  }

  // === export

  override getClientObj() {
    return super.getClientObj({
      hiddenCard: this.hiddenCard,
      // redundant code:
      // this needs to be merged with Game.checkSetHiddenFlipIndex
      // and with dealer.checkDecisionLoop
      permHideCard:
        (this.didAllPlayersBust() || this.didAllPlayersBlackjack()) && !this.hasBlackjack(),
    });
  }
}
