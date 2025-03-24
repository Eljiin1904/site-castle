import { Circle } from "@client/comps/circle/Circle";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgADA } from "@client/svgs/crypto/SvgADA";
import { SvgBNB } from "@client/svgs/crypto/SvgBNB";
import { SvgBTC } from "@client/svgs/crypto/SvgBTC";
import { SvgBUSD } from "@client/svgs/crypto/SvgBUSD";
import { SvgDOGE } from "@client/svgs/crypto/SvgDOGE";
import { SvgETH } from "@client/svgs/crypto/SvgETH";
import { SvgLTC } from "@client/svgs/crypto/SvgLTC";
import { SvgSOL } from "@client/svgs/crypto/SvgSOL";
import { SvgTRX } from "@client/svgs/crypto/SvgTRX";
import { SvgWWH } from "@client/svgs/crypto/SvgWWH";
import { SvgPEPE } from "@client/svgs/crypto/SvgPEPE";
import { SvgUSDT } from "@client/svgs/crypto/SvgUSDT";
import { SvgXRP } from "@client/svgs/crypto/SvgXRP";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const FooterPills = ({ wrap }: { wrap?: boolean }) => {
  const {t} = useTranslation();
  
  const layout = useAppSelector((x) => x.style.mainLayout);
  
  let gap: 20 | 24 | 32 |40 = 40;
  switch (layout) {
    case "mobile":
      gap = 20;
      break;
    case "tablet":
      gap = 24;
      break;
  }
  
  const cryptoOptions = [
    { cryptoIcon: SvgBTC, key: "BTC" },
    { cryptoIcon: SvgETH, key: "ETH" },
    { cryptoIcon: SvgSOL, key: "SOL" },
    { cryptoIcon: SvgLTC, key: "LTC" },
    { cryptoIcon: SvgUSDT, key: "USDT" },
    { cryptoIcon: SvgBNB, key: "BNB" },
    { cryptoIcon: SvgXRP, key: "XRP" },
    { cryptoIcon: SvgDOGE, key: "DOGE" },
    { cryptoIcon: SvgTRX, key: "TRX" },
    { cryptoIcon: SvgADA, key: "ADA" },
    { cryptoIcon: SvgBUSD, key: "BUSD" },
    { cryptoIcon: SvgPEPE, key: "PEPE" },
    { cryptoIcon: SvgWWH, key: "WWH"}];

  return (
    <Div
      flexFlow={wrap ? "row-wrap" : undefined}
      gap={gap}
      py={gap}
      align="center"
      alignItems="center"
      justifyContent="space-between"
    >
      <Div
        column
        wrap
        fontSize={16}
        color="white"
      >
       {t("footer.acceptedTokens").toUpperCase()}
      </Div>
      <Div gap={layout === 'mobile' ? 20 : 24} wrap>
        {cryptoOptions.map((option, i) => (
          <CrytoCircle key={option.key} cryptoIcon={option.cryptoIcon} />
        ))}
      </Div>
    </Div>
  );
};

const CrytoCircle = ({ cryptoIcon }: { cryptoIcon: Svg }) => {

  return (<Circle
      as="div"
      width={48}
      height={48}
      align="center"
      justify="center"
      bg="dark-brown-active"
    >
      <Vector as={cryptoIcon} width={24} height={24} color="light-sand" />
    </Circle>);
};
