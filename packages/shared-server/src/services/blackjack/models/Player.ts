import {
  BlackjackBetAmounts,
  BlackjackBetTypeInsurance,
} from "#core/types/blackjack/BlackjackBetAmounts";
import { InsuranceStatus } from "#core/types/blackjack/InsuranceStatus";
import { BlackjackAction } from "#core/types/blackjack/BlackjackAction";
import { CardHolder } from "./CardHolder";
import { Dealer } from "./Dealer";
import { PlayerError } from "./Errors/PlayerError";
import { PlayerHand } from "./PlayerHand";
import { updateSidebetPayouts } from "../side-bets/updateSidebetPayouts";
import { entries } from "#core/services/utility/Utility";
import { SidebetPayout, SidebetPayoutData } from "#core/types/blackjack/BlackjackApiResponse";
import { getInitBetAmounts, getInsuranceBetAmount } from "#core/services/blackjack/Blackjack";

type SuperArgAr = ConstructorParameters<typeof CardHolder>;

export type PlayerArg = {
  userId: string;
  betAmounts: BlackjackBetAmounts;
  insurance?: InsuranceStatus;
  sidebetPayouts?: SidebetPayoutData[];
} & SuperArgAr[0];

type Opts = {
  onSplit?: () => Promise<void>;
  onDouble?: () => Promise<void>;
  onInsurance?: () => Promise<void>;
  getDealer: () => Dealer;
} & SuperArgAr[1];

type PlayerHandArg = ConstructorParameters<typeof PlayerHand>[0];

export class Player extends CardHolder {
  userId: string;
  betAmounts: BlackjackBetAmounts;
  insurance: InsuranceStatus;
  sidebetPayouts: SidebetPayoutData[] = [];

  onSplit?: () => Promise<void>;
  onDouble?: () => Promise<void>;
  onInsurance?: () => Promise<void>;

  getDealer: () => Dealer;

  // not sure what to do about this
  // @ts-ignore
  hands!: PlayerHand[];

  // === init ===

  constructor(
    { userId, insurance = "pending", betAmounts, sidebetPayouts, ...arg }: PlayerArg,
    { onSplit, onDouble, onInsurance, getDealer, ...opts }: Opts,
  ) {
    super({ ...arg }, opts);
    this.userId = userId;
    this.betAmounts = betAmounts;
    this.insurance = insurance;
    this.bindSidebetPayouts(sidebetPayouts);
    this.onSplit = onSplit;
    this.onInsurance = onInsurance;
    this.getDealer = getDealer;

    // This should be passed through
    // but I'd need to refactor hand creation
    this.onDouble = onDouble;

    // super does this, but won't recast type
    // doing this entirely for typescript :(
    this.setHands(arg.hands);
  }

  // switch to temp flag not from-db flag
  private bindSidebetPayouts(sidebetPayouts: SidebetPayoutData[] | undefined) {
    if (sidebetPayouts)
      this.sidebetPayouts = sidebetPayouts.map((payout) => {
        return {
          ...payout,
          fromData: true,
        };
      });
  }

  override createHand(hand: Omit<PlayerHandArg, "betAmounts">) {
    return new PlayerHand(
      { betAmounts: this.betAmounts, ...hand },
      {
        drawCard: this.drawCard,
        onDouble: this.onDouble,
        getDealer: this.getDealer,
        isGameCompleted: this.isGameCompleted,
      },
    );
  }

  // === actions ===

  // overloads
  action(
    action: "insurance",
    {
      buyInsurance,
    }: {
      buyInsurance: boolean;
    },
  ): Promise<void>;
  action(action: Exclude<BlackjackAction, "insurance">): Promise<void>;

  override async action(
    action: BlackjackAction,
    {
      buyInsurance,
    }: {
      buyInsurance?: boolean;
    } = {},
  ): Promise<void> {
    if (action === "insurance") {
      if (this.insurance !== "pending")
        throw new PlayerError("Insurance already submitted", this.userId);

      if (buyInsurance && this.onInsurance) await this.onInsurance();
      this.insurance = buyInsurance ? "bought" : "not bought";
      //
      // redundant with super
    } else if (!this.hasHandPlaying()) {
      throw new PlayerError("action: Game is over", this.userId, { action });
      //
    } else if (this.insurance == "pending") {
      throw new PlayerError("Insurance not bought", this.userId);
      //
    } else if (action == "split") {
      if (!this.canSplit()) throw new PlayerError("Can't split this hand ", this.userId);

      if (this.onSplit) await this.onSplit();

      const hand = this.getPlayingHand();

      const [card1, card2] = hand.cards.map((card) => card.getDbObj());

      const index = this.hands.indexOf(hand);

      const newHands = [
        this.createHand({ cards: [card1], split: true }),
        this.createHand({ cards: [card2], split: true }),
      ];
      this.hands.splice(index, 1, ...newHands);

      for (let hand of newHands) {
        await hand.addCard();
      }
    } else {
      await super.action(action);
    }
  }

  setInsuranceNotAvailable() {
    this.insurance = "not available";
  }

  private canSplit() {
    // only 1 split allowed
    if (this.hands.length >= 2) return false;

    const hand = this.getPlayingHand();
    return this.has2Cards() && hand.isPair();
  }

  // === convenience ===

  private has2Cards() {
    return this.getPlayingHand().has2Cards();
  }
  override getPlayingHand() {
    return super.getPlayingHand() as PlayerHand;
  }
  override tryGetPlayingHand() {
    return super.tryGetPlayingHand() as PlayerHand;
  }

  haveAllHandsBusted() {
    return this.hands.every((hand) => hand.hasBusted());
  }
  haveAllHandsBlackjacked() {
    return this.hands.every((hand) => hand.hasBlackjack());
  }

  // === payout ===

  // storing instead of computing bc I have to track which transactions have been run
  setSidebetPayouts() {
    if (this.insurance === "pending") return;
    updateSidebetPayouts(this.sidebetPayouts as SidebetPayout[], {
      player: this,
      dealer: this.getDealer(),
    });
  }

  getMainPayout() {
    if (!this.isGameCompleted()) return null;

    return this.hands.reduce((acc, hand) => {
      const payout = hand.getMainPayout();
      if (!payout) throw new Error("Missing payout");
      return acc + payout.amount;
    }, 0);
  }

  // === export ===

  getAllowedActions() {
    if (this.insurance === "pending") return ["insurance"];

    const ar: BlackjackAction[] = ["hit", "stand"];
    if (this.has2Cards()) ar.push("double");
    if (this.canSplit()) ar.push("split");
    return ar;
  }

  private getSharedObj() {
    return {
      userId: this.userId,
      betAmounts: this.betAmounts,
      insurance: this.insurance,
      sidebetPayouts: this.sidebetPayouts,
      mainPayout: this.getMainPayout(),
      totalPayout: this.getTotalPayout(),
      statusTitle: this.getStatusTitle(),
    };
  }

  private getStatusTitle() {
    if (!this.isGameCompleted()) return null;

    const titles = this.hands.map((hand) => hand.getMainPayout()?.title);
    const titlesMatch = titles.every((title) => title === titles[0]);
    return titlesMatch ? titles[0] : titles.join(" | ");
  }

  override getDbObj() {
    return {
      ...this.getSharedObj(),
      ...super.getDbObj(),
    };
  }
  override getClientObj() {
    const curHand = this.tryGetPlayingHand();
    return {
      ...this.getSharedObj(),
      displayBetAmounts: this.getDisplayBetAmounts(),
      hands: this.hands.map((hand) =>
        hand.getClientObj({
          isCurrentHand: this.hands.length == 1 || hand === curHand,
        }),
      ),
    };
  }

  // === UI chip display ===

  private getDisplayBetAmounts() {
    if (this.hands[0].cards.length == 0) throw new Error("client export before hand dealt");

    const mainBet = this.betAmounts["main-bet"];
    let betAmounts: BlackjackBetAmounts = {
      ...getInitBetAmounts(),
      "main-bet": mainBet,
    };

    // split
    if (this.hands.length > 1) betAmounts["main-bet"] += mainBet;

    if (this.insurance == "bought") betAmounts["main-bet"] += getInsuranceBetAmount(mainBet);

    this.hands.forEach((hand) => {
      if (hand.double) betAmounts["main-bet"] += mainBet;
    });

    if (this.insurance === "pending") {
      // display all until insurance is resolved
      betAmounts = {
        ...this.betAmounts,
        "main-bet": betAmounts["main-bet"],
      };
    } else {
      this.sidebetPayouts.forEach((payout) => {
        if (payout.type !== "insurance") betAmounts[payout.type] = this.betAmounts[payout.type];
      });
    }

    return betAmounts;
  }

  // === transaction export ===

  getPayoutTicket() {
    return {
      userId: this.userId,
      betAmounts: this.betAmounts,
      mainPayout: this.getMainPayout(),
      newSidebetPayouts: this.getNewSidebetPayouts(),
      feedAr: this.getFeedAr(),
    };
  }

  private getNewSidebetPayouts() {
    return this.sidebetPayouts.filter((payout) => !payout.fromData);
  }

  // === feed event ===

  getFeedAr() {
    if (!this.isGameCompleted()) return null;

    const mainPayout = this.getMainPayout();
    if (mainPayout === null) throw new Error("attempt to get payout before computed");

    const hasBlackjack = (this.hands.length == 1 && this.hands[0].hasBlackjack()) || false;

    const main = {
      userId: this.userId as string | null,
      type: "main-bet" as BlackjackBetTypeInsurance,
      betAmount: this.getMainBetTotal(),
      payoutAmount: mainPayout,

      // splits are complicated. Doubles are 4x but have 2x bet, so 2x still?
      multiplier: hasBlackjack ? 2.5 : 2,
      playerHandValues: this.getHandHighValues(),
      dealerHandValues: this.getDealer().getHandHighValues(),
    };

    const ar: (typeof main)[] = [];
    if (main.betAmount) ar.push(main);

    entries(this.betAmounts).forEach(([type, amount]) => {
      if (type === "main-bet") return;
      if (!amount) return;

      const payout = this.sidebetPayouts.find((p) => p.type === type);

      ar.push({
        userId: this.userId,
        type: type,
        betAmount: amount,
        multiplier: payout?.multiplier || 0,
        payoutAmount: payout?.amount || 0,
        playerHandValues: [], // skipping TS fixing
        dealerHandValues: [],
      });
    });

    if (this.insurance == "bought") {
      const betAmount = getInsuranceBetAmount(this.betAmounts["main-bet"]);
      const payout = this.sidebetPayouts.find((p) => p.type === "insurance");
      ar.push({
        userId: this.userId,
        type: "insurance",
        betAmount,
        multiplier: payout?.multiplier || 0,
        payoutAmount: payout?.amount || 0,
        playerHandValues: [], // skipping TS fixing
        dealerHandValues: [],
      });
    }

    return ar;
  }

  // === UI + testing + feed ===

  getMainBetTotal() {
    let originalBet = this.betAmounts["main-bet"];
    let total = originalBet;

    if (this.hands.length > 1) total += originalBet;
    this.hands.forEach((hand) => {
      if (hand.double) total += originalBet;
    });
    return total;
  }

  getTotalPayout() {
    const mainPayout = this.getMainPayout() || 0;
    const sidebetPayout = this.sidebetPayouts.reduce((acc, payout) => acc + payout.amount, 0);
    return mainPayout + sidebetPayout;
  }
}
