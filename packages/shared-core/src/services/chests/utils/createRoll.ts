import { Numbers } from "#core/services/numbers";
import { ChestDocument } from "#core/types/chests/ChestDocument";
import { ChestItem } from "#core/types/chests/ChestItem";
import { ChestRoll } from "#core/types/chests/ChestRoll";
import { getChestFlags } from "./getChestFlags";
// import { getChestFlags } from "./getChestFlags";

type Settings = { minAnnounceAmount: number; minAnnounceMultiplier: number };

export function createRoll({
  chest,
  value,
  specialEnabled,
  settings,
}: {
  chest: ChestDocument;
  value: number;
  specialEnabled: boolean;
  settings: Settings;
}) {
  const lootIndex = getLootIndex({ chest, roll: value });
  const loot = chest.items[lootIndex];

  const specialCurry = (chestItem: ChestItem, openCost: number) =>
    getChestFlags({
      settings,
      openCost,
      chestItem,
    }).special;

  const hasEnoughSpecialItems =
    chest.items.filter((item) => specialCurry(item, chest.openCost)).length >= 3;

  const isItemSpecial = specialCurry(loot, chest.openCost);

  const specialShow = specialEnabled && hasEnoughSpecialItems;
  const specialSpin = specialShow && isItemSpecial;

  const spin: ChestRoll = {
    value,
    lootIndex,
    offset: Numbers.randomInt(0, 100),
    specialShow,
    specialSpin,
    reel: [
      getRandomItemIndex({ chest, specialSpin, settings }),
      getRandomItemIndex({ chest, specialSpin, settings }),
      getRandomItemIndex({ chest, specialSpin, settings }),
      getRandomItemIndex({ chest, specialSpin, settings }),
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
  settings,
}: {
  chest: ChestDocument;
  specialSpin: boolean;
  settings: Settings;
}) {
  const items = specialSpin
    ? chest.items.filter(
        (x) =>
          getChestFlags({
            settings,
            openCost: chest.openCost,
            chestItem: x,
          }).special,
      )
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
