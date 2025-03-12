import axios from "axios";
import crypto from "crypto";
import { Intimal } from "@core/services/intimal";
import { MarketProviderManager } from "#server/types/market/MarketProviderManager";
import { HandledError } from "#server/services/errors";
import { Site } from "#server/services/site";
import config from "#server/config";

// https://skindeck.com/docs/merchant-api#client-endpoints

// TODO: remove hardcoded
const defaultSteamId = "76561199817887616";
const defaultTradeUrl =
  "https://steamcommunity.com/tradeoffer/new/?partner=1857621888&token=2_7dZJod";

type ResponseData<T> =
  | {
      success: false;
      message: string;
    }
  | ({
      success: true;
    } & T);

type SteamUser = {
  steamId: string;
  tradeUrl: string;
};

type InventoryItem = {
  id: string;
  market_hash_name: string;
  offer?: { price: number; reference: string };
};

type MarketItem = {
  id: string;
  market_hash_name: string;
  offer: { price: number; reference: string };
};

export class SkinDeckManager implements MarketProviderManager {
  async getInventory(options: { steamId: string; tradeUrl: string }) {
    const res = await this.createRequest<{ inventory: InventoryItem[] }>({
      method: "get",
      path: "inventory/",
      user: {
        steamId: options.steamId,
        tradeUrl: options.tradeUrl,
      },
      data: {
        perPage: 100,
      },
    });

    const items = [];

    for (const item of res.inventory) {
      if (!item.offer) {
        continue;
      }

      const usdValue = item.offer.price || 0;

      items.push({
        assetId: item.id,
        name: item.market_hash_name,
        tokenValue: Intimal.fromDecimal(usdValue / Site.tokenUsdRate),
        usdValue,
        reference: item.offer.reference,
      });
    }

    return { items };
  }

  async createDeposit(options: {
    assetId: string;
    steamId: string;
    tradeUrl: string;
    priceUsd: number;
    reference?: string;
  }) {
    const res = await this.createRequest<{
      trade: {
        _id: string;
      };
    }>({
      method: "post",
      path: "trading/deposit",
      user: {
        steamId: options.steamId,
        tradeUrl: options.tradeUrl,
      },
      data: {
        itemId: options.assetId,
        offer: {
          price: options.priceUsd,
          reference: options.reference,
        },
      },
    });

    return {
      externalId: res.trade._id,
    };
  }

  async getMarket() {
    const res = await this.createRequest<{
      items: MarketItem[];
    }>({
      method: "get",
      path: "market/",
      user: {
        steamId: defaultSteamId,
        tradeUrl: defaultTradeUrl,
      },
      data: {
        perPage: 1e5,
      },
    });

    const items = [];

    for (const item of res.items) {
      const usdValue = item.offer.price;

      items.push({
        id: item.id,
        name: item.market_hash_name,
        tokenValue: Intimal.fromDecimal(usdValue / Site.tokenUsdRate),
        usdValue,
        reference: item.offer.reference,
      });
    }

    return { items };
  }

  async createWithdraw(options: {
    steamId: string;
    tradeUrl: string;
    externalItemId: string;
    priceUsd: number;
    reference?: string;
  }) {
    const res = await this.createRequest<{
      trade: {
        _id: string;
        item: { offer: { price: number } };
      };
    }>({
      method: "post",
      path: "trading/withdraw",
      user: {
        steamId: options.steamId,
        tradeUrl: options.tradeUrl,
      },
      data: {
        itemId: options.externalItemId,
        offer: {
          price: options.priceUsd,
          reference: options.reference,
        },
      },
    });

    const usdValue = res.trade.item.offer.price;

    return {
      purchaseId: res.trade._id,
      tokenValue: Intimal.fromDecimal(usdValue / Site.tokenUsdRate),
      usdValue,
    };
  }

  async getWithdrawInfo() {
    return { purchases: [] };
  }

  async getBalance() {
    const res = await axios.get<{
      amount: number;
    }>("https://api.skindeck.com/secure/user/wallet", {
      headers: {
        "api-key": config.skindeckApiKey,
      },
    });

    return { balance: res.data.amount };
  }

  validateRequest(data: Record<string, any>) {
    const tokenHash = crypto
      .createHash("sha-256")
      .update(config.skindeckSecret)
      .digest("hex");

    return tokenHash === data.signature;
  }

  private async createRequest<T = unknown>({
    method,
    path,
    user,
    data,
  }: {
    method: "get" | "post";
    path: string;
    user: SteamUser;
    data: Record<string, any>;
  }) {
    const auth = await axios.post<{
      token: string;
    }>(
      "https://api.skindeck.com/auth/authenticate-client",
      {
        clientSteamId: user.steamId,
        clientTradeUrl: user.tradeUrl,
      },
      {
        headers: {
          "api-key": config.skindeckApiKey,
        },
      },
    );

    let res;

    if (method === "get") {
      res = await axios.get<ResponseData<T>>(
        `https://api.skindeck.com/client/${path}`,
        {
          headers: {
            authorization: auth.data.token,
          },
          params: data,
        },
      );
    } else {
      res = await axios.post<ResponseData<T>>(
        `https://api.skindeck.com/client/${path}`,
        data,
        {
          headers: {
            authorization: auth.data.token,
          },
        },
      );
    }

    if (!res.data.success) {
      console.log(data);
      throw new HandledError(`SkinDeck error: ${res.data.message}`);
    }

    return res.data;
  }
}
