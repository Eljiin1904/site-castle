import { CryptoSymbol } from "@core/types/cryptos/CryptoSymbol";
import { SvgQuestionCircle } from "#client/svgs/common/SvgQuestionCircle";
import { SvgBTCWallet } from "#client/svgs/wallet/SvgBTCWallet";
import { SvgETHWallet } from "#client/svgs/wallet/SvgETHWallet";
import { SvgLTCWallet } from "#client/svgs/wallet/SvgLTCWallet";
import { SvgSOLWallet } from "#client/svgs/wallet/SvgSOLWallet";
import { SvgDOGEWallet } from "#client/svgs/wallet/SvgDOGEWallet";
import { SvgADAWallet } from "#client/svgs/wallet/SvgADAWallet";
import { SvgTRXWallet } from "#client/svgs/wallet/SvgTRXWallet";
import { SvgUSDCWallet } from "#client/svgs/wallet/SvgUSDCWallet";
import { SvgUSDTWallet } from "#client/svgs/wallet/SvgUSDTWallet";

export function getIcon(symbol: CryptoSymbol) {
  switch (symbol) {
    case "ADA":
      return SvgADAWallet;
    case "BTC":
      return SvgBTCWallet;
    case "DOGE":
      return SvgDOGEWallet;
    case "ETH":
      return SvgETHWallet;
    case "LTC":
      return SvgLTCWallet;
    case "SOL":
      return SvgSOLWallet;
    case "TRX":
      return SvgTRXWallet;
    case "USDC":
      return SvgUSDCWallet;
    case "USDT":
      return SvgUSDTWallet;
    default:
      return SvgQuestionCircle;
  }
}
