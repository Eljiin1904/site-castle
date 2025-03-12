import { tradeUrlRegex } from "../constants/tradeUrlRegex";

export function parseTradeUrl(url: string | undefined) {
  let partner;
  let token;

  if (url && tradeUrlRegex.test(url)) {
    const params = new URL(url).searchParams;

    partner = params.get("partner");
    token = params.get("token");
  }

  return { partner, token };
}
