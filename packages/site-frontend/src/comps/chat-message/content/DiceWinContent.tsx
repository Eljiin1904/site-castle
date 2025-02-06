import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteToken } from "@client/svgs/site/SvgSiteToken";
import { Link } from "@client/comps/link/Link";

export const DiceWinContent = ({
  multiplier,
  wonAmount,
}: {
  multiplier: number;
  wonAmount: number;
}) => {
  return (
    <Link
      type="router"
      to="/dice"
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
        {`${Numbers.toLocaleString(multiplier, 2)}x`}
      </Span>
      <Span size={13}>{" in "}</Span>
      <Span
        size={13}
        color="white"
      >
        {"Dice"}
      </Span>
      <Span size={13}>{"!"}</Span>
    </Link>
  );
};
