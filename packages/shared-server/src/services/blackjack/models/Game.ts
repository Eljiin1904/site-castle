import { getTotalBetAmount } from "#core/services/blackjack/Blackjack";
import { BlackjackAction } from "#core/types/blackjack/BlackjackAction";
import { BlackjackActionHistory } from "#core/types/blackjack/BlackjackGameDocument";
import { Dealer } from "./Dealer";
import { Deck } from "./Deck";
import { GameError } from "./Errors/GameError";
import Seeds, { GetRandomCardIndex, SeedsArg } from "./helpers/Seeds";
import { PlayerArg, Player } from "./Player";

type InitArg = {
  _id: string;
  players: PlayerArg[];
  seeds: SeedsArg;
  dealer?: undefined;
  deck?: undefined;
  timestamp?: Date;
  history?: BlackjackActionHistory[];
  syncIndex?: number;
};
type Arg = DbGameData | InitArg;

type UserId = string; // for doc

type Opts = {
  onDouble?: () => Promise<void>;
  onSplit?: () => Promise<void>;
  onInsurance?: () => Promise<void>;
  getRandomCardIndex: GetRandomCardIndex;
};

export class Game {
  private deck: Deck;
  private dealer: Dealer;
  players: Player[]; // public for testing
  private timestamp?: Date;
  private syncIndex: number;
  private seeds: Seeds;

  private history: BlackjackActionHistory[];

  _id: string;

  constructor(
    { dealer, players, _id, timestamp, history, syncIndex, seeds }: Arg,
    { onDouble, onSplit, onInsurance, getRandomCardIndex }: Opts,
  ) {
    this._id = _id;
    this.timestamp = timestamp;
    this.history = history || [];
    this.syncIndex = syncIndex || 0;
    this.seeds = new Seeds(seeds, { getRandomCardIndex });

    this.deck = new Deck({
      getRandomCardIndex: () => this.seeds.getRandomCardIndex(),
      isGameCompleted: this.isGameCompleted.bind(this),
    });

    // userId for mock testing
    const drawCard = () => this.deck.drawCard(players[0].userId);

    this.players = players.map(
      (player) =>
        new Player(player, {
          drawCard,
          onDouble,
          onSplit,
          onInsurance,
          getDealer: this.getDealer.bind(this),
          isGameCompleted: this.isGameCompleted.bind(this),
        }),
    );
    this.dealer = new Dealer(dealer, {
      drawCard,
      didAllPlayersBust: this.didAllPlayersBust.bind(this),
      didAllPlayersBlackjack: this.didAllPlayersBlackjack.bind(this),
      isGameCompleted: this.isGameCompleted.bind(this),
    });
  }

  private getDealer() {
    return this.dealer;
  }
  private isGameCompleted() {
    return this.completed;
  }

  private pushHistory(action: BlackjackAction, buyInsurance?: boolean) {
    this.history.push({ action, buyInsurance, createdAt: new Date() });
  }

  get completed() {
    if (this.dealer.hasBlackjack() && !this.playersInsurancePending()) return true;
    return !this.hasSomePlayersPlaying();
  }

  setId(id: string) {
    this._id = id;
  }
  getId() {
    if (!this._id) throw new GameError("getId: game has no id", this._id);
    return this._id;
  }

  dealFirstCards() {
    this.playersDrawCard();
    this.dealer.initDrawCard();
    this.playersDrawCard();
    this.dealer.initDrawCard();
    this.checkSetInsurance();
    this.checkSetHiddenFlipIndex();
    // won't work here with super7 but that was removed
    this.setPlayerPayouts();
  }
  private playersDrawCard() {
    for (const player of this.players) {
      player.initDrawCard();
    }
  }
  private getPlayersInsurancePending() {
    return this.players.filter((player) => player.insurance == "pending");
  }
  // move into player isPlaying()
  private playersInsurancePending() {
    const players = this.getPlayersInsurancePending();
    return players.length > 0;
  }
  private hasSomePlayersPlaying() {
    if (this.playersInsurancePending()) return true;
    return this.players.some((player) => player.hasHandPlaying());
  }
  private didAllPlayersBust() {
    return this.players.every((player) => player.haveAllHandsBusted());
  }
  private didAllPlayersBlackjack() {
    return this.players.every((player) => player.haveAllHandsBlackjacked());
  }
  // compute this instead of storing
  private checkSetInsurance() {
    if (!this.dealer.hasAceUp()) {
      this.players.forEach((player) => player.setInsuranceNotAvailable());
    }
  }
  private checkSetHiddenFlipIndex() {
    const allBusted = this.didAllPlayersBust();
    const allBlackjacked = this.didAllPlayersBlackjack();

    // redundant code:
    // this needs to be merged with dealer.getClientObj
    // and with dealer.checkDecisionLoop
    // this is horrible sorry
    if (
      (this.completed && !allBusted && !allBlackjacked) ||
      (this.dealer.hasBlackjack() && !this.playersInsurancePending())
    ) {
      this.dealer.addOrderIndexToHiddenCard(() => this.deck.indexNext());
    }
  }

  // Integration Failure:
  // "The call would have succeeded against this implementation, but implementation signatures of overloads are not externally visible."
  // === overloads:
  // action(action: "insurance", { userId, buyInsurance }: {
  //   userId: UserId
  //   buyInsurance: boolean
  // }): void
  // action(action: Exclude<Action, "insurance">, { userId }: {
  //   userId: UserId;
  // }): void

  async action(
    action: BlackjackAction,
    syncIndex: number,
    {
      userId,
      buyInsurance,
    }: {
      userId: UserId;
      buyInsurance?: boolean;
    },
  ): Promise<void> {
    if (this.completed) throw new GameError("action: game has already completed ", this._id);

    // multiplayer: will have to be updated to allow multiple insurance at once
    if (syncIndex !== this.syncIndex) {
      throw new Error(`action is out of order ${syncIndex}`);
    }

    this.pushHistory(action, buyInsurance);

    if (action === "insurance") {
      const player = this.getPlayerById({ userId });

      // not sure why overload isn't enforcing this
      await player.action(action, { buyInsurance: buyInsurance! });
    } else {
      const curPlayer = this.getCurPlayer();
      if (curPlayer.userId !== userId)
        throw new GameError("action: not player's turn", this._id, { userId });

      await curPlayer.action(action);
    }

    this.checkSetHiddenFlipIndex();
    await this.checkRunDealerDecisionLoop();

    this.syncIndex++;
    this.setPlayerPayouts();
  }

  private async checkRunDealerDecisionLoop() {
    // redundant code:
    // this needs to be merged with Dealer.getClientObj
    // and with Dealer.checkSetHiddenFlip
    if (
      !this.hasSomePlayersPlaying() &&
      !this.didAllPlayersBust() &&
      !this.didAllPlayersBlackjack()
    ) {
      await this.dealer.decisionLoop();
    }
  }

  // could check userId here but it's not always available
  // would need to also refactor getNextAction
  private getCurPlayer() {
    const players = this.getPlayersInsurancePending();
    if (players.length)
      // not going to work in multiplayer
      return players[0];

    const curPlayer = this.players.find((player) => player.hasHandPlaying());
    if (!curPlayer) {
      throw new GameError("getCurPlayer: no players playing", this._id);
    }
    return curPlayer;
  }
  private getPlayerById({ userId }: { userId: UserId }) {
    const player = this.players.find((player) => player.userId === userId);
    if (!player)
      throw new GameError("getPlayerById: player not found", this._id, {
        userId,
      });
    return player;
  }

  getCurPlayerMainBet({ userId }: { userId: UserId }) {
    const curPlayer = this.getCurPlayer();
    if (curPlayer.userId !== userId)
      throw new GameError("getCurPlayerMainBet: not player's turn", this._id, {
        userId,
      });
    return curPlayer.betAmounts["main-bet"];
  }

  getNextAction() {
    if (this.completed) return null;

    const curPlayer = this.getCurPlayer();
    const allowedActions = curPlayer.getAllowedActions();
    return [
      {
        userId: curPlayer.userId,
        allowedActions,
      },
    ];
  }

  // === pass through ===
  getOrderIndex() {
    return this.deck.orderIndex;
  }

  // === payout ===
  private setPlayerPayouts() {
    this.players.forEach((player) => {
      player.setSidebetPayouts();
    });
  }

  // === export ===

  private getSharedObj() {
    return {
      _id: this._id,

      // storing computed value to index and simplify query
      completed: this.completed,
      syncIndex: this.syncIndex,
    };
  }
  getDbObj() {
    return {
      ...this.getSharedObj(),
      dealer: this.dealer.getDbObj(),
      players: this.players.map((player) => player.getDbObj()),
      seeds: this.seeds.getDbObj(),

      // audit
      timestamp: this.timestamp || new Date(),
      history: this.history,
    };
  }

  private getClientObj() {
    return {
      ...this.getSharedObj(),
      dealer: this.dealer.getClientObj(),
      players: this.players.map((player) => player.getClientObj()),
    };
  }
  getApiResponse() {
    return {
      game: this.getClientObj(),
      nextAction: this.getNextAction(),
    };
  }

  // === transaction export ===

  getPayoutTicket() {
    const result = {
      _id: null as string | null,
      gameId: this._id,
      players: this.players.map((player) => player.getPayoutTicket()),

      completed: this.completed,
      processDelay: this.getProcessDelay(),
      timestamp: new Date(),
      processed: false,
      processDate: null as Date | null,
    };

    if (result.completed) {
      const hasBets = result.players.some((p) => getTotalBetAmount(p.betAmounts) > 0);
      if (hasBets) return result;
    } else {
      const hasPayouts = result.players.some(
        (p) => p.mainPayout || p.newSidebetPayouts?.some((sp) => sp.amount > 0),
      );
      if (hasPayouts) return result;
    }
    return null;
  }

  getProcessDelay() {
    // configs live on frontend, hardcoding instead of moving them
    // move configs to shared-core
    const CARD_MOVE_TIME = 200;
    const CARD_FLIP_TIME = 200;
    const DELAY_PER_CARD = 400;

    const orderIndex = this.deck.orderIndex;
    const val = orderIndex * DELAY_PER_CARD + CARD_MOVE_TIME + CARD_FLIP_TIME;
    return val;
  }

  // === sim/testing ===

  // shorthand for unit tests
  get _payoutAmount() {
    return this.players[0].getMainPayout();
  }
  get _insurancePayout() {
    return this.players[0].sidebetPayouts.find((sp) => sp.type === "insurance")?.amount;
  }

  log() {
    const dealer = this.dealer.getString();
    const player = this.players[0].getString();
    const history = this.history
      .map((h) => {
        let opts = "";
        if (h.action == "insurance") opts = `(${h.buyInsurance ? "yes" : "no"})`;
        return h.action + opts;
      })
      .join(", ");
    const payout = this.players[0].getPayoutTicket()?.mainPayout;
    console.log(`
      dealer: ${dealer}
      player: ${player}
      history: ${history}
      payout: ${payout}`);
  }
}

export type DbGameData = ReturnType<Game["getDbObj"]>;
