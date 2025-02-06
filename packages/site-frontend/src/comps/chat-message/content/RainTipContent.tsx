import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteToken } from "@client/svgs/site/SvgSiteToken";
import { Intimal } from "@core/services/intimal";

export const RainTipContent = ({ amount }: { amount: number }) => {
  return (
    <Div display="block">
      <Span size={13}>{"tipped the rain "}</Span>
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
          {Intimal.toLocaleString(amount)}
        </Span>
      </Div>
      <Span size={13}>{"!"}</Span>
    </Div>
  );
};
