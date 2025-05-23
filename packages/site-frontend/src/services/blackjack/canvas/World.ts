import ClientPlayer from "./models/ClientPlayer";
import ClientDealer from "./models/ClientDealer";
import Canvas from "./helpers/Canvas";
import EventEmitter from "./helpers/EventEmitter";
import { Owner } from "./models/helpers/HandInfo";
import ClientDeck from "./models/ClientDeck";
import { BlackjackClientGameData } from "@core/types/blackjack/BlackjackApiResponse";

type Arg = {
  game: BlackjackClientGameData;
};

export default class BlackjackWorld {
  private players?: ClientPlayer[];
  private dealer?: ClientDealer;

  private canvas: Canvas;
  private staticCanvas: Canvas;

  private events = new EventEmitter();
  private deck = new ClientDeck();

  constructor() {
    this.events.on("hand-dealt", (owner: Owner) => {
      this.checkEmit(owner);
    });

    this.canvas = new Canvas({
      events: this.events,
    });
    this.staticCanvas = new Canvas({
      events: this.events,
      addEvents: false,
    });
  }

  setData({ game: { players, dealer } }: Arg) {
    if (this.players) {
      this.dismount();
    }

    this.players = players.map(
      (player) =>
        new ClientPlayer(player, {
          events: this.events,
        }),
    );
    this.dealer = new ClientDealer(dealer, {
      events: this.events,
    });
    this.updatePositions();
  }

  queueUpdateGame({ game, delay = 0 }: { game: BlackjackClientGameData; delay?: number }) {
    setTimeout(() => {
      this.updateGame({ game });
    }, delay);
  }

  updateGame({ game }: { game: BlackjackClientGameData }) {
    if (!this.players || !this.dealer) {
      this.setData({ game });
      return;
    }

    this.players.forEach((player, i) => {
      player.update(game.players[i]);
    });
    this.dealer.update(game.dealer);
    this.updatePositions();
  }

  draw(parentElement: HTMLElement) {
    parentElement.appendChild(this.staticCanvas.canvas);
    parentElement.appendChild(this.canvas.canvas);

    // for situation where slice is set before draw
    // rendering doesn't work if not attached to dom apparently
    this.render();
    this.renderDeck();
  }

  private async updatePositions() {
    if (!this.players || !this.dealer) return;

    await this.loadImages();

    this.players.forEach((player) => player.updatePositions(this.canvas.positionOpts()));
    this.dealer.updatePositions(this.canvas.positionOpts());

    if (!this.someCardsWithOrderIndex()) {
      this.events.emit("cards-dealt");
    }

    this.emittedOwners.clear();
    this.render();
  }

  private async loadImages() {
    if (!this.players || !this.dealer) return;

    await Promise.all([
      this.deck.loadImage(),
      this.dealer.loadCardImages(),
      ...this.players.map((player) => player.loadCardImages()),
    ]);
  }

  async renderDeck() {
    await this.deck.loadImage();

    this.staticCanvas.setRenderer((renderArg) => {
      this.deck.draw(renderArg);
    });
  }

  private render() {
    if (!this.players || !this.dealer) return;

    this.staticCanvas.setRenderer((renderArg) => {
      this.deck.draw(renderArg);
    });

    this.canvas.setRenderer((renderArg) => {
      if (!this.players || !this.dealer) throw new Error("Players or Dealer not set");
      this.dealer.draw(renderArg);
      this.players.map((player) => player.draw(renderArg));
    });
  }

  on(event: string, cb: (...args: any[]) => void) {
    this.events.on(event, cb);
  }
  off(event: string, cb: (...args: any[]) => void) {
    this.events.off(event, cb);
  }

  private emittedOwners = new Set<Owner>();
  private checkEmit(owner: Owner) {
    const owners = this.emittedOwners;
    owners.add(owner);
    if (owners.has("dealer") && owners.has("player")) {
      this.events.emit("cards-dealt");
      this.emittedOwners.clear();
    }
  }

  areCardsAnimating() {
    const cardsAnimating =
      this.dealer?.areCardsAnimating() &&
      this.players?.every((player) => player.areCardsAnimating());
    return cardsAnimating;
  }
  // works better than prev method
  someCardsWithOrderIndex() {
    return (
      this.dealer?.hasCardsWithOrderIndex() ||
      this.players?.some((player) => player.hasCardsWithOrderIndex())
    );
  }

  // === deallocate ===

  // called from slice atm
  clear() {
    this.dismount(); // doubling down
    this.canvas.clear();
    this.players = undefined;
    this.dealer = undefined;
  }

  dismount() {
    this.players?.forEach((player) => player.dismount());
    this.dealer?.dismount();
    // this.drawn = false
    // this.canvas.canvas.remove();
  }
  // destroy() {
  //   // delete references, ex event callbacks
  // }
}
