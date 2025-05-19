import { BlackjackSeedData } from "#core/types/blackjack/BlackjackGameDocument";

type InitArg = Omit<BlackjackSeedData, "step">;
export type SeedsArg = InitArg | BlackjackSeedData;

// COPIED: type exists on shared-server, not avail on shared-core
export type GetRandomCardIndex = (params: {
  serverSeed: string;
  clientSeed: string;
  nonce: string | number;
  step: number;
}) => number;

type Opts = {
  getRandomCardIndex: Seeds["_getRandomCardIndex"];
};

export default class Seeds {
  private data: BlackjackSeedData;
  private _getRandomCardIndex: GetRandomCardIndex;

  constructor(data: SeedsArg, { getRandomCardIndex }: Opts) {
    this.data = { step: 0, ...data };
    this._getRandomCardIndex = getRandomCardIndex;
  }

  getRandomCardIndex() {
    return this._getRandomCardIndex({
      ...this.data,
      step: this.data.step++,
    });
  }

  getDbObj() {
    return this.data;
  }
}
