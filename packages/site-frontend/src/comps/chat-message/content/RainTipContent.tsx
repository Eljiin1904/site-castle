import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgMoney } from "@client/svgs/common/SvgMoney";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Intimal } from "@core/services/intimal";

export const RainTipContent = ({ amount }: { amount: number }) => {
  const { t } = useTranslation(["chat"]);
  return (
    <Div display="block">
      <Span size={13}>{t('tipped')}</Span>
      <Div display="inline-block">
        <Vector
          size={13}
          as={SvgMoney}
          top={1}
          mr={2}
        />
        <Span
          size={13}         
          color="bright-green"
        >
          {Intimal.toLocaleString(amount)}
        </Span>
      </Div>
      <Span size={13}>{"!"}</Span>
    </Div>
  );
};
