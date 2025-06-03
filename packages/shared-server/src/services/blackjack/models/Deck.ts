import { DrawCardError } from "./Errors/DrawCardError";
import { Card } from "./Card";
import { getCards } from "@core/services/blackjack/Blackjack";
import { cardMap } from "../testing/cardMap";

export type DeckUtil = {
  getRandomCardIndex: Deck["getRandomCardIndex"];
  isGameCompleted: () => boolean;
};

export class Deck {
  private cards!: Card[];
  orderIndex = 0;
  private getRandomCardIndex: () => number;
  private isGameCompleted: () => boolean;

  constructor({ getRandomCardIndex, isGameCompleted }: DeckUtil) {
    this.getRandomCardIndex = getRandomCardIndex;
    this.isGameCompleted = isGameCompleted;
    this.initCards();
  }

  private initCards() {
    // const cardDataAr = cards || getCards();
    const cardDataAr = getCards(); // infinite deck
    this.cards = cardDataAr.map(
      (cardData) => new Card(cardData, { isGameCompleted: this.isGameCompleted }),
    );
  }

  // userId for mock testing
  drawCard(userId: string): Card {
    // async drawCard(): Promise<Card> {
    try {
      // if (!this.cards.length) throw new OutOfCardsError();

      // used for testing
      const mock = cardMap.get(userId);
      if (mock) {
        const cardData = mock.cards[mock.index++];
        if (cardData) {
          const card = new Card(cardData, {
            isGameCompleted: this.isGameCompleted,
          });
          card.setOrderIndex(this.indexNext());
          return card;
        } else if (mock.resetAtEnd) cardMap.delete(userId);
        else throw new Error("Tried to get mock card that doesn't exist");
      }

      const cardIndex = this.getRandomCardIndex();

      let card = this.cards[cardIndex];
      if (!card) throw new DrawCardError({ error: "Invalid card index: " + cardIndex });

      card = card.clone();
      card.setOrderIndex(this.indexNext());
      return card;
    } catch (error) {
      throw new DrawCardError({ error });
    }
  }

  indexNext() {
    return this.orderIndex++;
  }

  // === export

  getDbObj() {
    return {
      cards: this.cards.map((card) => card.getDbObj()),
    };
  }
}

export type DrawCard = () => ReturnType<Deck["drawCard"]>;
