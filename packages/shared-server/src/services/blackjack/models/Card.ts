import { getCardValues } from "@core/services/blackjack/Blackjack";
import { CardData } from "@core/types/blackjack/CardData";

type Opts = {
  isGameCompleted: () => boolean;
};

export class Card {
  private orderIndex?: number;
  private hiddenFlipIndex?: number;

  constructor(
    private data: CardData,
    private opts: Opts,
  ) {}

  get value() {
    return this.data.value;
  }
  get suit() {
    return this.data.suit;
  }

  get values() {
    return getCardValues(this.value);
  }

  clone() {
    return new Card(this.data, this.opts);
  }

  setOrderIndex(orderIndex: number) {
    this.orderIndex = orderIndex;
  }
  setHiddenFlipIndex(hiddenFlipIndex: number) {
    this.hiddenFlipIndex = hiddenFlipIndex;
  }
  isAce() {
    return this.value === "A";
  }

  // export
  getSharedObj() {
    return {
      ...this.data,
    };
  }
  getClientObj({ isHidden, permHideCard }: { isHidden: boolean; permHideCard?: boolean }) {
    const obj =
      isHidden && (permHideCard || !this.opts.isGameCompleted())
        ? {
            hidden: true,
            suit: null,
            value: null,
          }
        : {};

    return {
      ...this.getSharedObj(),
      ...obj, // mask values
      orderIndex: this.orderIndex,
      hiddenFlipIndex: this.hiddenFlipIndex,
      shouldHide: isHidden,
    };
  }
  getDbObj() {
    return {
      ...this.getSharedObj(),
    };
  }
}

// export type ClientCardData = ReturnType<Card["getClientObj"]>;
