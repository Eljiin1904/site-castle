export type CoinAlchWebhook = {
  type: "VAULT_ACCOUNT_ADDED" | "TRANSACTION_CREATED" | "TRANSACTION_STATUS_UPDATED";
  tenantId: string;
  timestamp: number;
  data?: {
    note?: string;
    source: {
      id: string;
      type: string;
      name: string;
    };
    destination: {
      id: string;
      type: string;
      name: string;
    };
    destinationAddress: string;
    destinationAddressDescription: string;
    customerRefId?: string;
  };
} & (
  | {
      type: "VAULT_ACCOUNT_ADDED";
      id: string;
      name: string;
      hiddenOnUI: boolean;
    }
  | {
      type: "TRANSACTION_CREATED" | "TRANSACTION_STATUS_UPDATED";
      data: {
        id: string;
        externalTxId: null | string;
        createdAt: number;
        lastUpdatedAt: number;
        assetId: string;
        sourceAddress: string;
        destinationAddress: string;
        destinationAddressDescription: string;
        status: string;
        subStatus: string;
        txHash: string;
        numOfConfirmations: number;
        amount: number;
        amountUSD: number;
        networkFee: number;
        netAmount: number;
        note: string;
      };
    }
);

export type CoinAlchTxData = (CoinAlchWebhook & {
  type: "TRANSACTION_CREATED" | "TRANSACTION_STATUS_UPDATED";
})["data"];
