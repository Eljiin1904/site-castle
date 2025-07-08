import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteToken } from "@client/svgs/site/SvgSiteToken";
import { Link } from "@client/comps/link/Link";
import { BlackjackBetTypeInsurance } from "@core/types/blackjack/BlackjackBetAmounts";

export const BlackjackWinContent = ({
  betKind,
  wonAmount,
}: {
  betKind: BlackjackBetTypeInsurance;
  wonAmount: number;
}) => {
  return (
    <Link
      type="router"
      to="/blackjack"
      hover="none"
      display="block"
    >
      <Span size={13}>{"won "}</Span>
      <Div display="inline-block">
        <Vector
          size={13}
          as={SvgSiteToken}
          top={1}
          mr={2}
        />
        <Span
          size={13}
          weight="semi-bold"
          color="light-green"
        >
          {Intimal.toLocaleString(wonAmount)}
        </Span>
      </Div>
      <Span size={13}>{" on "}</Span>
      <Span
        size={13}
        color="white"
      >
      {getBetKindText(betKind)}
      </Span>
      <Span size={13}>{" in "}</Span>
      <Span
        size={13}
        color="white"
      >
        {"Blackjack"}
      </Span>
      <Span size={13}>{"!"}</Span>
    </Link>
  );
};


const getBetKindText = (betKind: BlackjackBetTypeInsurance) => {
  switch (betKind) {
    case "main-bet":
      return "Main Bet";
    case "insurance":
      return "Insurance";
    case "blackjack-15x":
      return "Blackjack 15x";
    case "21+3":
      return "21+3";
    case "perfect-pairs":
      return "Perfect Pairs";
    case "lucky-ladies":
      return "Lucky Ladies";
    default:
      return betKind;
  }
};