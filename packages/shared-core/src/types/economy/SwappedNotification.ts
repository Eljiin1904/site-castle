export type SwappedNotification =
  | {
      order_status: "payment_pending";
      external_transaction_id: string;
      external_customer_id: string;
      order_id: string;
    }
  | {
      order_status: "order_cancelled";
      external_transaction_id: string;
      external_customer_id: string;
      order_id: string;
    }
  | {
      order_status: "order_completed";
      order_id: string;
      order_crypto_amount: number;
      order_crypto: "BTC" | "LTC";
      order_crypto_address: string;
      external_transaction_id: string;
      external_customer_id: string;
      order_amount_usd: string;
      order_amount_usd_plus_fees: string;
      order_amount_eur: string;
      order_amount_eur_plus_fees: string;
      network: string;
    }
  | {
      order_status: "order_broadcasted";
      order_id: string;
      order_crypto_amount: string;
      order_crypto: "BTC" | "LTC";
      transaction_id: string;
      order_crypto_address: string;
      external_transaction_id: string;
      external_customer_id: string;
      order_amount_usd: string;
      order_amount_usd_plus_fees: string;
      order_amount_eur: string;
      order_amount_eur_plus_fees: string;
      network: string;
    };
