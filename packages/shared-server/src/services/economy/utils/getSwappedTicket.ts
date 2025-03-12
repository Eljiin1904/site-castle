import crypto from "crypto";
import { SwappedTicketDocument } from "@core/types/economy/SwappedTicketDocument";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";
import config from "#server/config";
import { getSwappedWallet } from "./getSwappedWallet";

// https://docs.swapped.com/

export async function getSwappedTicket({ userId }: { userId: string }) {
  const ticketId = Ids.object();

  const publicKey = config.swappedPublicKey;
  const secretKey = config.swappedSecret;

  let domain;
  let responseUrl;

  if (config.env === "production") {
    domain = "widget";
    responseUrl = "https://ipn.chicken.gg/swapped/notification";
  } else {
    domain = "sandbox";
    responseUrl = "https://ipn.staging.chicken.gg/swapped/notification";
  }

  const { walletAddress, currencyCode } = await getSwappedWallet({
    userId,
  });

  // TODO: clean this mess of a string up
  const originalUrl = `https://${domain}.swapped.com?apiKey=${publicKey}&currencyCode=${currencyCode}&walletAddress=${walletAddress}&language=${"EN"}&baseCurrencyCode=${"USD"}&baseCurrencyAmount=${10.0}&externalTransactionId=${ticketId}&externalCustomerId=${
    userId
  }&coverFees=${"false"}&style=${"chickengg"}&responseUrl=${encodeURIComponent(responseUrl)}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(new URL(originalUrl).search)
    .digest("base64");

  const url = `${originalUrl}&signature=${encodeURIComponent(signature)}`;

  const ticket: SwappedTicketDocument = {
    _id: ticketId,
    timestamp: new Date(),
    userId,
    url,
  };

  await Database.collection("swapped-tickets").insertOne(ticket);

  return ticket;
}
