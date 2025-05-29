import ClientCard from "./ClientCard";
import { RenderArg } from "../helpers/Canvas";
import { Point } from "../vectors/Point";
import { Anchor } from "../vectors/Dims";
import HandInfo, { BlackjackOldInfo, Owner } from "./helpers/HandInfo";
import { NEW_CARD_OFFSET } from "../config";
import EventEmitter from "../helpers/EventEmitter";
import {
  BlackjackClientCardData,
  BlackjackClientPlayerHandData,
} from "@core/types/blackjack/BlackjackApiResponse";
import { getCombinedValues } from "@core/services/blackjack/Blackjack";

type Opts = {
  owner: Owner;
  events: EventEmitter;
  splitCardPosition?: Point;
};

// memory leak with event emitter bc instances aren't dismounted

export default class ClientHand {
  private cards: ClientCard[] = [];
  private stand: boolean; // not needed, might remove
  private handInfo: HandInfo;
  private events: EventEmitter;

  // should be on ClientPlayerHand
  // private payout?: HandPayout
  private isCurrentHand: boolean;

  constructor(
    { cards, stand, info, isCurrentHand, mainPayout }: BlackjackClientPlayerHandData,
    { owner, events, splitCardPosition }: Opts,
  ) {
    this.stand = stand;
    this.events = events;
    this.isCurrentHand = isCurrentHand !== false; // undefined on DealerHand atm
    this.cards = cards.map((card) => this.createCard(card));
    this.cards[0].setSplitCardPosition(splitCardPosition);

    this.handInfo = new HandInfo(info, {
      payout: mainPayout,
      owner,
      events: this.events,
      getCurHandValues: this.getCurHandValues.bind(this),
    });
  }

  private createCard(cardData: BlackjackClientCardData) {
    return new ClientCard(cardData, { events: this.events });
  }

  private getCurHandValues() {
    const cards = this.cards.filter((card) => !card.hidden && !card.isAnimating());
    const values = cards.map((card) => card.value).filter((val) => val !== null);
    if (values.length === 0) return [];
    const combined = getCombinedValues(values);
    // copied from Hand.ts
    const filter = combined.filter((val) => val <= 21);
    if (!filter.length) return [Math.min(...combined)];
    return filter;
  }

  // update({ cards, stand, info }: ClientHandData) {
  //   this.stand = stand;
  //   this.handInfo.update(info)

  //   // skipping delta
  //   this.cards = cards.map((card) => this.createCard(card));

  //   // this.cards.forEach((card, i) => {
  //   //   // unmask hidden card
  //   //   const cardData = cards[i];
  //   //   if (cardData) card.update(cardData);
  //   //   this.cards.push(new ClientCard(cardData));
  //   // });
  // }

  draw(renderArg: RenderArg) {
    this.cards.forEach((card) => {
      card.draw(renderArg, { isCurrentHand: this.isCurrentHand });
    });
    this.handInfo.draw(renderArg);
  }

  updatePosition(point: Point, anchor: Anchor) {
    this.handInfo.updatePosition(point);

    let scale = this.cards.length > 5 ? 1 - 0.03 * this.cards.length : 1;

    this.cards.forEach((card, index) => {
      const xOff = NEW_CARD_OFFSET.x * scale;
      const yOff = NEW_CARD_OFFSET.y * scale;

      const cardPoint = {
        x: point.x + index * xOff,
        y: point.y + index * yOff,
      };
      card.updatePosition(cardPoint, anchor);
    });
  }

  loadCardImages() {
    return Promise.all(this.cards.map((card) => card.loadImage()));
  }

  getNewCards() {
    const cards = this.cards.filter((card) => card.isNew());
    return cards;
  }

  areCardsAnimating() {
    return this.cards.some((card) => card.isAnimating());
  }
  hasCardsWithOrderIndex() {
    return this.cards.some((card) => card.hasOrderIndex());
  }
  getSplitCardPositions() {
    if (this.cards.length !== 2)
      throw new Error("attempt to get split card positions during non-split");
    return [this.cards[0].getPosition(), this.cards[1].getPosition()];
  }

  // for old hand values on new instance creation
  // getInfo() {
  //   return this.handInfo.getInfo();
  // }

  dismount() {
    this.handInfo.dismount();
  }
}
