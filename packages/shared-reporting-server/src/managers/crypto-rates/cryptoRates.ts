import axios from "axios";
import { minutesToMilliseconds } from "date-fns";
import { CryptoSymbol } from "@core/types/cryptos/CryptoSymbol";
import { System } from "@server/services/system";
import { Cryptos } from "@server/services/cryptos";
import { Database } from "@server/services/database";

export default () =>
  setInterval(System.tryCatch(main), minutesToMilliseconds(2));

async function main() {
  for (const symbol of Cryptos.symbols) {
    await System.tryCatch(handleSymbol)(symbol);
  }
}

async function handleSymbol(symbol: CryptoSymbol) {
  const usdRate = await getUsdRate(symbol);

  if (!usdRate) {
    console.warn("Failed to update price for " + symbol);
    return;
  }

  await Database.collection("crypto-rates").updateOne(
    {
      _id: symbol,
    },
    {
      $set: {
        usdRate,
        syncDate: new Date(),
      },
    },
    {
      upsert: true,
    },
  );
}

async function getUsdRate(symbol: CryptoSymbol) {
  let points: number[] = await Promise.all([
    getCoinbaseRate(symbol),
    getKrakenRate(symbol),
    getGeminiRate(symbol),
    getOkxRate(symbol),
    getKucoinRate(symbol),
  ]);

  points = points.filter((x) => x !== 0);
  points = filterOutliers(points);

  if (points.length === 0) {
    return 0;
  }

  const count = points.length;
  const total = points.reduce((acc, value) => (acc += value), 0);
  const mean = Math.round((total / count) * 100000) / 100000;

  return mean;
}

function filterOutliers(points: number[]) {
  if (points.length < 2) {
    return points; // Not enough points
  }

  function getMedian(values: number[]) {
    values.sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    return values.length % 2 !== 0
      ? values[mid]
      : (values[mid - 1] + values[mid]) / 2;
  }

  // Calculate the median of the points
  const median = getMedian(points);

  // Calculate the absolute deviations from the median
  const deviations = points.map((value) => Math.abs(value - median));

  // Calculate the median of these deviations (MAD: Median Absolute Deviation)
  const deviationMedian = getMedian(deviations);

  // Define a threshold for outliers
  const threshold = 3 * deviationMedian;

  return points.filter((value) => Math.abs(value - median) <= threshold);
}

async function getCoinbaseRate(symbol: CryptoSymbol) {
  if (["USDC", "TRX"].includes(symbol)) {
    return 0;
  }
  const { data } = await axios.get(
    `https://api.exchange.coinbase.com/products/${symbol}-USD/ticker`,
  );
  return Number.parseFloat(data.price as string);
}

async function getKrakenRate(symbol: CryptoSymbol) {
  const { data } = await axios.get(
    `https://api.kraken.com/0/public/Ticker?pair=${symbol}USD`,
  );
  return Number.parseFloat(
    Object.values(data.result as object)[0]["a"][0] as string,
  );
}

async function getGeminiRate(symbol: CryptoSymbol) {
  if (["TRX", "ADA"].includes(symbol)) {
    return 0;
  }
  const { data } = await axios.get(
    `https://api.gemini.com/v2/ticker/${symbol}USD`,
  );
  return Number.parseFloat(data.ask as string);
}

async function getOkxRate(symbol: CryptoSymbol) {
  const { data } = await axios.get(
    `https://www.okx.com/api/v5/market/index-tickers?instId=${symbol}-USD`,
  );
  return Number.parseFloat(data.data[0].idxPx as string);
}

async function getKucoinRate(symbol: CryptoSymbol) {
  const { data } = await axios.get(
    `https://api.kucoin.com/api/v1/prices?currencies=${symbol}`,
  );
  return Number.parseFloat(data.data[symbol] as string);
}
