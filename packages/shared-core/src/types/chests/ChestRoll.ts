export interface ChestRoll {
  value: number;
  lootIndex: number;
  offset: number;
  specialShow: boolean;
  specialSpin: boolean;
  reel: [
    itemIndex1: number,
    itemIndex2: number,
    itemIndex3: number,
    itemIndex4: number,

    reelIndex1: number,
    reelIndex2: number,
    reelIndex3: number,
    reelIndex4: number,
  ];
}
