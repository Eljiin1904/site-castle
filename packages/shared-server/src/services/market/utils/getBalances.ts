import { System } from "#server/services/system";
import { managers } from "../constants/managers";

export async function getBalances() {
  const getters = managers.map(async ({ manager }) => {
    try {
      return await manager.getBalance();
    } catch (err) {
      System.handleError(err);
      return { balance: 0 };
    }
  });

  const results = await Promise.all(getters);

  const balances = results.map((x, i) => ({
    provider: managers[i].name,
    balance: x.balance,
  }));

  return balances;
}
