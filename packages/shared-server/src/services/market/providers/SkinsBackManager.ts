import axios from "axios";
import crypto from "crypto";
import { Intimal } from "@core/services/intimal";
import { Market } from "@core/services/market";
import { Site } from "#server/services/site";
import { MarketProviderManager } from "#server/types/market/MarketProviderManager";
import { HandledError } from "#server/services/errors";
import config from "#server/config";

// https://skinsback.com/docs/api/v1/main/

type ResponseData<T> =
  | {
      status: "error";
      error_message: string;
    }
  | ({
      status: "success";
    } & T);

type InventoryItem = {
  item: {
    asset_id: string;
    tradable: 0 | 1;
    app_id: string;
    icon_url: string;
    class_id: string;
  };
  name: string;
  price: number;
  disabled: boolean;
};

type MarketItem = {
  id: string;
  name: string;
  price: number;
};

type WithdrawStatus =
  | "creating_trade"
  | "waiting_accept"
  | "accepted"
  | "canceled"
  | "timeout"
  | "invalid_trade_token"
  | "user_not_tradable"
  | "trade_create_error";

export class SkinsBackManager implements MarketProviderManager {
  async getInventory(options: { steamId: string; tradeUrl: string }) {
    const { token } = Market.parseTradeUrl(options.tradeUrl);

    const res = await this.createRequest<{ data: { items: InventoryItem[] } }>({
      method: "user_inventory",
      steam_id: options.steamId,
      trade_token: token,
    });

    const items = [];

    for (const item of res.data.items) {
      const usdValue = item.price;

      items.push({
        assetId: item.item.asset_id,
        name: this.adjustName(item.name),
        tokenValue: Intimal.fromDecimal(usdValue / Site.tokenUsdRate),
        usdValue,
      });
    }

    return { items };
  }

  async createDeposit(options: {
    depositId: string;
    assetId: string;
    steamId: string;
    tradeUrl: string;
    priceUsd: number;
  }) {
    const { token } = Market.parseTradeUrl(options.tradeUrl);

    const res = await this.createRequest<{
      data: {
        transaction_id: string;
        trade_offer_id: string;
        bot_steam_id: string;
      };
    }>({
      method: "create_from_user_inventory",
      steam_id: options.steamId,
      trade_token: token,
      item_asset_ids: [options.assetId],
      order_id: options.depositId,
      result_url:
        config.env === "production"
          ? "https://ipn.chicken.gg/skinsback/deposit"
          : "https://ipn.staging.chicken.gg/skinsback/deposit",
    });

    return {
      externalId: `${res.data.transaction_id}`,
      tradeOfferId: res.data.trade_offer_id,
    };
  }

  async getMarket() {
    const res = await this.createRequest<{ items: MarketItem[] }>({
      method: "market_pricelist",
      full: true,
    });

    // skinsback will duplicate elements for skins with a phase
    // one that includes the phase, one that doesnt
    // we need the phase included, so keep the longest one

    const map = new Map();

    for (const item of res.items) {
      const itemName = this.adjustName(item.name);
      const other = map.get(item.id);

      if (other && other.name.length > itemName.length) {
        continue;
      }

      const usdValue = item.price;

      map.set(item.id, {
        id: item.id,
        name: itemName,
        tokenValue: Intimal.fromDecimal(usdValue / Site.tokenUsdRate),
        usdValue,
      });
    }

    const items = [...map.values()];

    return { items };
  }

  async createWithdraw(options: {
    tradeUrl: string;
    externalItemId: string;
    priceUsd: number;
  }) {
    const { partner, token } = Market.parseTradeUrl(options.tradeUrl);

    const res = await this.createRequest<{
      buy_id: string;
      balance_debited_sum: number;
    }>({
      method: "market_buy",
      partner: partner,
      token: token,
      id: options.externalItemId,
    });

    const usdValue = res.balance_debited_sum;

    return {
      purchaseId: `${res.buy_id}`,
      tokenValue: Intimal.fromDecimal(usdValue / Site.tokenUsdRate),
      usdValue,
    };
  }

  async getWithdrawInfo(options: { purchaseIds: string[] }) {
    const res = await this.createRequest<{
      items: Array<{
        buy_id: string;
        offer_status: WithdrawStatus;
        tradeofferid?: string;
      }>;
    }>({
      method: "market_getinfo",
      buy_ids: options.purchaseIds,
    });

    const purchases = [];

    for (const purchase of res.items) {
      const status = purchase.offer_status;

      purchases.push({
        id: purchase.buy_id,
        status,
        tradeOfferId: purchase.tradeofferid,
        isCompleted: ["accepted"].includes(status),
        isCanceled: [
          "canceled",
          "timeout",
          "invalid_trade_token",
          "user_not_tradable",
          "trade_create_error",
        ].includes(status),
      });
    }

    return { purchases };
  }

  async getBalance() {
    const res = await this.createRequest<{
      balance: string;
    }>({
      method: "balance",
    });

    const balance = Number.parseFloat(res.balance);

    return { balance };
  }

  validateRequest(data: Record<string, any>) {
    return this.buildSignature(data) === data.sign;
  }

  private async createRequest<T = unknown>(options: Record<string, any>) {
    const data: Record<string, any> = {
      shopid: config.skinsbackId,
      game: "cs2",
      ...options,
    };

    data.sign = this.buildSignature(data);

    const res = await axios.post<ResponseData<T>>(
      "https://skinsback.com/api.php",
      data,
    );

    if (res.data.status === "error") {
      if (res.data.error_message === "deposit_amount_less_minimum") {
        throw new HandledError("Skin value is below provider's minimum.");
      } else {
        console.log(data);
        throw new HandledError(`SkinsBack error: ${res.data.error_message}`);
      }
    }

    return res.data;
  }

  private adjustName(str: string) {
    // skinsback name: ★ Butterfly Knife | Gamma Doppler Emerald (Factory New)
    // expected name: ★ Butterfly Knife | Gamma Doppler (Factory New) - Emerald

    const regex = /Doppler\s([^()]+)\s*\(/;
    const match = str.match(regex);

    if (match) {
      const phase = match[1].trim();
      return str.replace(phase + " ", "") + " - " + phase;
    } else {
      return str;
    }
  }

  private buildSignature(data: Record<string, any>) {
    let signature = "";

    for (const [key, value] of Object.entries(data).sort()) {
      if (key === "sign") continue;
      if (typeof value == "object") continue;
      if (Array.isArray(value)) continue;

      signature += "" + key + ":" + value + ";";
    }

    signature = crypto
      .createHmac("sha1", config.skinsbackSecret)
      .update(signature)
      .digest("hex");

    return signature;
  }
}
