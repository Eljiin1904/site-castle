import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const DemoNotice = () => {

  const {t} = useTranslation('games'); 
  return (<Div fx gap={16} >
    <Vector as={SvgInfoCircle} color="sand" />
    <Span size={12}>{t('games:demoModeInfo')}</Span>
  </Div>)
};