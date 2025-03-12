export interface MarketProviderManager {
  getInventory: (options: { steamId: string; tradeUrl: string }) => Promise<{
    items: Array<{
      assetId: string;
      name: string;
      tokenValue: number;
      usdValue: number;
      reference?: string;
    }>;
  }>;

  createDeposit: (options: {
    depositId: string;
    assetId: string;
    steamId: string;
    tradeUrl: string;
    priceUsd: number;
    reference?: string;
  }) => Promise<{
    externalId: string;
    tradeOfferId?: string;
  }>;

  getMarket: () => Promise<{
    items: Array<{
      id: string;
      name: string;
      tokenValue: number;
      usdValue: number;
      reference?: string;
    }>;
  }>;

  createWithdraw: (options: {
    steamId: string;
    tradeUrl: string;
    withdrawId: string;
    externalItemId: string;
    priceUsd: number;
    reference?: string;
  }) => Promise<{
    purchaseId: string;
    tokenValue: number;
    usdValue: number;
  }>;

  getWithdrawInfo: (options: { purchaseIds: string[] }) => Promise<{
    purchases: Array<{
      id: string;
      status: string;
      tradeOfferId: string | undefined;
      isCompleted: boolean;
      isCanceled: boolean;
    }>;
  }>;

  getBalance: () => Promise<{
    balance: number;
  }>;

  validateRequest: (data: Record<string, any>) => boolean;
}
