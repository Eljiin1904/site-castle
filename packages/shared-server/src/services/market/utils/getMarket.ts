import { Site } from "#server/services/site";
import { System } from "#server/services/system";
import { managers } from "../constants/managers";

export async function getMarket() {
  const settings = await Site.settings.cache();

  const getters = managers.map(async (provider) => {
    if (!settings[`${provider.name}Enabled`]) {
      return { items: [] };
    }

    try {
      return await provider.manager.getMarket();
    } catch (err) {
      System.handleError(err);
      return { items: [] };
    }
  });

  const results = await Promise.all(getters);

  const items = [];

  for (let i = 0; i < results.length; i++) {
    const provider = managers[i].name;

    for (const item of results[i].items) {
      items.push({ ...item, provider });
    }
  }

  return items;
}
