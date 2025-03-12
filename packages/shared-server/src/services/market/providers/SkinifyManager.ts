import axios from "axios";
import crypto from "crypto";
import { Intimal } from "@core/services/intimal";
import { Market } from "@core/services/market";
import { Site } from "#server/services/site";
import { MarketProviderManager } from "#server/types/market/MarketProviderManager";
import { HandledError } from "#server/services/errors";
import config from "#server/config";

// https://skinify.io/api-docs

type ResponseData<T> =
  | {
      status: "error";
      error_message: string;
    }
  | ({
      status: "success";
    } & T);

type InventoryItem = {
  id: string;
  name: string;
  type: string;
  quality: string;
  img: string;
  tradable: 0 | 1;
  short_type: string;
  disabled: 0 | 1;
  price: string;
  gid: string;
};

type MarketItem = {
  id: string;
  name: string;
  price: string;
};

type WithdrawStatus =
  | "processing"
  | "waiting_accept"
  | "accepted"
  | "canceled"
  | "timeout"
  | "error_invalid_token"
  | "error_user_not_tradable"
  | "error_create_failed";

export class SkinifyManager implements MarketProviderManager {
  async getInventory(options: { steamId: string; tradeUrl: string }) {
    const { token } = Market.parseTradeUrl(options.tradeUrl);

    const res = await this.createRequest<{ inventory: InventoryItem[] }>(
      "steam-inventory",
      {
        game: "csgo",
        steam_id: options.steamId,
        trade_token: token,
      },
    );

    const items = [];

    for (const item of res.inventory) {
      const usdValue = Number.parseFloat(item.price);

      items.push({
        assetId: item.id,
        name: item.name,
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

    const { transaction_id } = await this.createRequest<{
      url: string;
      transaction_id: string;
    }>("create-deposit", {
      deposit_id: options.depositId,
      steam_id: options.steamId,
      trade_url_token: token,
      result_url:
        config.env === "production"
          ? "https://ipn.chicken.gg/skinify/deposit"
          : "https://ipn.staging.chicken.gg/skinify/deposit",
    });

    const res = await this.createRequest<{
      tradeofferid: string;
      botid: string;
    }>("create-steam-offer", {
      transaction_id,
      game: "csgo",
      items: [options.assetId],
    });

    return {
      externalId: `${transaction_id}`,
      tradeOfferId: res.tradeofferid,
    };
  }

  async getMarket() {
    const res = await this.createRequest<{ skins: MarketItem[] }>(
      "withdraw/prices",
      {
        game: "csgo",
        full_list: 1,
      },
    );

    const items = [];

    for (const item of res.skins) {
      const usdValue = Number.parseFloat(item.price);

      items.push({
        id: item.id,
        name: item.name,
        tokenValue: Intimal.fromDecimal(usdValue / Site.tokenUsdRate),
        usdValue,
      });
    }

    return { items };
  }

  async createWithdraw(options: {
    tradeUrl: string;
    externalItemId: string;
    priceUsd: number;
  }) {
    const { partner, token } = Market.parseTradeUrl(options.tradeUrl);

    const res = await this.createRequest<{
      purchase_id: string;
      balance_debited_amount: string;
    }>("withdraw/buy", {
      partner: partner,
      token: token,
      id: options.externalItemId,
    });

    const usdValue = Number.parseFloat(res.balance_debited_amount);

    return {
      purchaseId: `${res.purchase_id}`,
      tokenValue: Intimal.fromDecimal(usdValue / Site.tokenUsdRate),
      usdValue,
    };
  }

  async getWithdrawInfo(options: { purchaseIds: string[] }) {
    const res = await this.createRequest<{
      items: Array<{
        purchase_id: string;
        purchase_status: WithdrawStatus;
        trade_offer_id?: string;
      }>;
    }>("withdraw/info", {
      purchase_ids: options.purchaseIds,
    });

    const purchases = [];

    for (const purchase of res.items) {
      const status = purchase.purchase_status;

      purchases.push({
        id: purchase.purchase_id,
        status,
        tradeOfferId: purchase.trade_offer_id,
        isCompleted: ["accepted"].includes(status),
        isCanceled: [
          "canceled",
          "timeout",
          "error_invalid_token",
          "error_user_not_tradable",
          "error_create_failed",
        ].includes(status),
      });
    }

    return { purchases };
  }

  async getBalance() {
    const res = await this.createRequest<{
      balance: string;
    }>("project-balance", {});

    const balance = Number.parseFloat(res.balance);

    return { balance };
  }

  validateRequest(data: Record<string, any>) {
    const tokenHash = crypto
      .createHash("md5")
      .update(config.skinifyToken)
      .digest("hex");

    return tokenHash === data.token_md5;
  }

  private async createRequest<T = unknown>(
    path: string,
    data: Record<string, any>,
  ) {
    // pass the fields to both the body and query
    // where Skinify expects them to be is seemingly random

    const res = await axios.post<ResponseData<T>>(
      `https://skinify.io/api/${path}`,
      data,
      {
        params: data,
        headers: {
          Token: config.skinifyToken,
        },
      },
    );

    if (res.data.status === "error") {
      console.log(data);
      throw new HandledError(`Skinify error: ${res.data.error_message}`);
    }

    return res.data;
  }
}
