import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Chests } from "@server/services/chests";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";

export async function chestRollTest() {
  const chests = await Database.collection("chests")
    .find({
      kind: "case",
      disabled: false,
    })
    .toArray();

  const serverSeed = Ids.secret();
  const clientSeed = Ids.secret();
  const iterations = 1e6;

  let wagerAmount = 0;
  let wonAmount = 0;

  for (let i = 0; i < iterations; i++) {
    const chest = chests[Numbers.randomInt(0, chests.length - 1)];

    const rollValue = Random.getRoll({
      serverSeed,
      clientSeed,
      nonce: i,
      maxValue: 1000000,
    });

    const roll = Chests.createRoll({
      chest,
      specialEnabled: true,
      value: rollValue,
    });

    const loot = chest.items[roll.lootIndex];

    wagerAmount += Intimal.toDecimal(chest.openCost, 6);
    wonAmount += Intimal.toDecimal(loot.lootValue, 6);
  }

  const ev = wagerAmount * Chests.edgeRate;
  const evp = Chests.edgeRate;
  const ggr = wagerAmount - wonAmount;
  const ggrp = ggr / wagerAmount;
  const v = ggr - ev;
  const vp = ggrp - evp;

  console.log("------------");
  console.log("Iterations:", Numbers.toLocaleString(iterations, 0));
  console.log("------------");
  console.log("EV:", Numbers.toLocaleString(ev, 0));
  console.log("EV %:", Numbers.round(evp * 100, 3) + "%");
  console.log("GGR:", Numbers.toLocaleString(ggr, 0));
  console.log("------------");
  console.log("GGR %:", Numbers.round(ggrp * 100, 3) + "%");
  console.log("------------");
  console.log("Variance:", Numbers.toLocaleString(v, 0));
  console.log("Variance %:", Numbers.round(vp * 100, 3) + "%");
  console.log("------------");
}
