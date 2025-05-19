import { getHandPayout } from "#core/services/blackjack/Blackjack";
import { BlackjackAction } from "#core/types/blackjack/BlackjackAction";
import { BlackjackBetAmounts } from "#core/types/blackjack/BlackjackBetAmounts";
import { Dealer } from "./Dealer"; // high level reference, risking circ reference
import { Hand } from "./Hand";

// should switch to PlayerHand.getDbObj()
type Args = ConstructorParameters<typeof Hand>;
type UpArg = {
  betAmounts: BlackjackBetAmounts;
  split?: boolean;
  double?: boolean;
} & Args[0];
export type PlayerHandArg = UpArg;

type Opts = {
  onDouble?: () => Promise<void>;
  getDealer: () => Dealer;
} & Args[1];

export class PlayerHand extends Hand {
  private betAmounts: BlackjackBetAmounts;
  private split: boolean;
  double: boolean;

  onDouble?: () => Promise<void>;
  private getDealer: () => Dealer;

  constructor(
    { betAmounts, split = false, double = false, ...arg }: UpArg,
    { onDouble, getDealer, ...opts }: Opts,
  ) {
    super(arg, opts);
    this.betAmounts = betAmounts;
    this.split = split;
    this.double = double;
    this.onDouble = onDouble;
    this.getDealer = getDealer;
  }

  override hasBlackjack() {
    // currently: split can have blackjack
    if (this.split) return false;
    return super.hasBlackjack();
  }

  override async action(action: BlackjackAction) {
    switch (action) {
      case "double":
        if (!this.has2Cards()) throw new Error("Double action requires 2 cards");
        this.double = true;
        if (this.onDouble) await this.onDouble();
        this.addCard();
        break;

      default:
        await super.action(action);
    }
  }

  override isPlaying() {
    if (this.double) return false;
    if (this.isSplitAce()) return false;
    return super.isPlaying();
  }

  has2Cards() {
    return this.cards.length === 2;
  }
  isSplitAce() {
    return this.split && this.cards[0].value === "A";
  }

  // === payout ===

  getMainPayout() {
    if (!this.opts.isGameCompleted()) return null;

    return getHandPayout({
      handStatus: this.getStatus(),
      dealerStatus: this.getDealer().getStatus(),
      betAmount: this.betAmounts["main-bet"],
      isDouble: this.double,
      isSplit: this.split,
    });
  }

  // === export ===

  // optional to match override, could move off of PlayerHand
  override getClientObj({ isCurrentHand }: { isCurrentHand?: boolean }) {
    return {
      ...super.getClientObj(),
      ...this.getSharedObj(),
      isCurrentHand,
    };
  }
  override getDbObj() {
    return {
      ...super.getDbObj(),
      ...this.getSharedObj(),
    };
  }

  private getSharedObj() {
    return {
      betAmounts: this.betAmounts,
      split: this.split,
      double: this.double,
      mainPayout: this.getMainPayout(),
    };
  }
}
