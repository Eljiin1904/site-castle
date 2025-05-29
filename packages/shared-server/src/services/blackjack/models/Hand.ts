import { getCombinedValues } from "@core/services/blackjack/Blackjack";
import { BlackjackAction } from "@core/types/blackjack/BlackjackAction";
import { BlackjackHandStatus } from "@core/types/blackjack/BlackjackHandStatus";
import { Card } from "./Card";
import { DrawCard } from "./Deck";
import { CustomError } from "./Errors/CustomError";

export type HandArg = Partial<DbHandData>;

type Opts = {
  drawCard: DrawCard;
  isGameCompleted: () => boolean;
};

export class Hand {
  stand = false;
  cards: Card[] = [];

  constructor(
    { stand = false, cards }: HandArg,
    protected opts: Opts,
  ) {
    this.stand = stand;
    if (cards)
      this.cards = cards.map(
        (card) => new Card(card, { isGameCompleted: this.opts.isGameCompleted }),
      );
  }

  addCard() {
    const card = this.opts.drawCard();
    this.cards.push(card);
  }

  async action(action: BlackjackAction) {
    switch (action) {
      case "hit":
        this.addCard();
        break;
      case "stand":
        this.stand = true;
        break;

      default:
        throw new Error("Invalid action: " + action);
    }
  }
  getStatus(): BlackjackHandStatus {
    if (!this.hasCards()) throw new CustomError("Attempt to get status score without cards");
    if (this.hasBlackjack()) return { blackjack: true };
    if (this.hasBusted()) return { busted: true };
    return {
      score: this.getHighValue(),
    };
  }

  hasBusted() {
    if (!this.hasCards()) return false;
    return this.getCombinedValues().every((value) => value > 21);
  }
  hasCards() {
    return this.cards.length >= 2;
  }
  hasBlackjack() {
    if (this.cards.length != 2) return false;
    const vals = this.getCombinedValues();
    return Math.max(...vals) == 21;
  }
  isPlaying() {
    return !this.stand && !this.hasBusted() && !this.hasBlackjack() && !this.has21();
  }
  has21() {
    // check for bust must happen first
    return this.getHighValue() === 21;
  }
  getHighValue() {
    const vals = this.getCombinedValues();
    const under22 = vals.filter((val) => val <= 21);
    if (!under22.length)
      // should have checked for bust already
      throw new CustomError("can't find high val card");
    return Math.max(...under22);
  }
  // for feed items on ticket
  tryGetHighValue() {
    const vals = this.getCombinedValues();
    const under22 = vals.filter((val) => val <= 21);
    if (under22.length) return Math.max(...under22);
    return Math.min(...vals);
  }

  getCombinedValues() {
    const cardValues = this.cards.map((card) => card.value);
    return getCombinedValues(cardValues);
  }

  isPair() {
    if (this.cards.length !== 2) return false;
    return this.cards[0].value === this.cards[1].value;
  }

  // === export

  getDbObj() {
    return {
      stand: this.stand,
      cards: this.cards.map((card) => card.getDbObj()),
    };
  }

  getClientObj({
    hiddenCard,
    permHideCard,
    isCurrentHand, // move to CardHolder and Card ?
  }: {
    hiddenCard?: Card;
    permHideCard?: boolean;
    isCurrentHand?: boolean;
  } = {}) {
    return {
      stand: this.stand,
      cards: this.cards.map((card) =>
        card.getClientObj({
          isHidden: card === hiddenCard,
          permHideCard,
        }),
      ),
      info: {
        // status: this.getClientStatus(),
        handValues: this.getClientValues({
          hiddenCard,
          permHideCard,
        }),
      },
    };
  }
  // private getClientStatus() {
  //   if (this.hasBlackjack()) return "blackjack";
  //   if (this.hasBusted()) return "bust";
  //   if (this.stand) return "stand";
  //   return "playing"
  // }
  private getClientValues({
    hiddenCard,
    permHideCard,
  }: {
    hiddenCard?: Card;
    permHideCard?: boolean;
  }) {
    const cards =
      this.opts.isGameCompleted() && !permHideCard
        ? this.cards
        : this.cards.filter((card) => card !== hiddenCard);

    const vals = getCombinedValues(cards.map((card) => card.value));
    const filter = vals.filter((val) => val <= 21);
    if (!filter.length) return [Math.min(...vals)];
    return filter;
  }

  // === sim/testing ===

  getString() {
    return this.cards.map((card) => card.value).join(", ");
  }
}
type DbHandData = ReturnType<Hand["getDbObj"]>;
