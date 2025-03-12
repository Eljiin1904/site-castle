import { CryptoSymbol } from "@core/types/cryptos/CryptoSymbol";
import { SvgADA } from "#client/svgs/crypto/SvgADA";
import { SvgBTC } from "#client/svgs/crypto/SvgBTC";
import { SvgDOGE } from "#client/svgs/crypto/SvgDOGE";
import { SvgETH } from "#client/svgs/crypto/SvgETH";
import { SvgLTC } from "#client/svgs/crypto/SvgLTC";
import { SvgSOL } from "#client/svgs/crypto/SvgSOL";
import { SvgTRX } from "#client/svgs/crypto/SvgTRX";
import { SvgUSDC } from "#client/svgs/crypto/SvgUSDC";
import { SvgUSDT } from "#client/svgs/crypto/SvgUSDT";
import { SvgQuestionCircle } from "#client/svgs/common/SvgQuestionCircle";

export function getIcon(symbol: CryptoSymbol) {
  switch (symbol) {
    case "ADA":
      return SvgADA;
    case "BTC":
      return SvgBTC;
    case "DOGE":
      return SvgDOGE;
    case "ETH":
      return SvgETH;
    case "LTC":
      return SvgLTC;
    case "SOL":
      return SvgSOL;
    case "TRX":
      return SvgTRX;
    case "USDC":
      return SvgUSDC;
    case "USDT":
      return SvgUSDT;
    default:
      return SvgQuestionCircle;
  }
}
