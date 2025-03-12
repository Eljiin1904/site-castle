import { Numbers } from "#core/services/numbers";
import { ChestDocument } from "#core/types/chests/ChestDocument";
import { ChestRoll } from "#core/types/chests/ChestRoll";

export function createRoll({
  chest,
  value,
  specialEnabled,
}: {
  chest: ChestDocument;
  value: number;
  specialEnabled: boolean;
}) {
  const lootIndex = getLootIndex({ chest, roll: value });
  const loot = chest.items[lootIndex];
  const specialShow = specialEnabled; // && Math.random() < 0.8;
  const specialSpin = specialShow && loot.special;

  const spin: ChestRoll = {
    value,
    lootIndex,
    offset: Numbers.randomInt(0, 100),
    specialShow,
    specialSpin,
    reel: [
      getRandomItemIndex({ chest, specialSpin }),
      getRandomItemIndex({ chest, specialSpin }),
      getRandomItemIndex({ chest, specialSpin }),
      getRandomItemIndex({ chest, specialSpin }),
      Numbers.randomInt(9, 15),
      Numbers.randomInt(16, 22),
      Numbers.randomInt(23, 26),
      Numbers.randomInt(28, 31),
    ],
  };

  return spin;
}

function getLootIndex({ chest, roll }: { chest: ChestDocument; roll: number }) {
  let cursor = 0;

  for (let i = 0; i < chest.items.length; i++) {
    cursor += chest.items[i].dropRate;

    if (cursor >= roll) {
      return i;
    }
  }

  return chest.items.length - 1;
}

function getRandomItemIndex({
  chest,
  specialSpin,
}: {
  chest: ChestDocument;
  specialSpin: boolean;
}) {
  const items = specialSpin
    ? chest.items.filter((x) => x.special)
    : chest.items;
  const rValue = Numbers.randomInt(1, 1000);
  let index;

  if (rValue <= 10) {
    index = 0;
  } else if (rValue <= 30) {
    index = 1;
  } else if (rValue <= 60) {
    index = 2;
  } else if (rValue <= 100) {
    index = 3;
  } else {
    index = Numbers.randomInt(4, items.length - 1);
  }

  if (index >= items.length) {
    index = items.length - 1;
  }

  return index;
}
