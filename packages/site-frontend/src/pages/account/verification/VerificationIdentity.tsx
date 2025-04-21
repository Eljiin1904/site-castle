import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgVerification } from "@client/svgs/common/SvgVerification";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const VerificationIdentity = ({tier}:{
  tier: number
}) => {

  const {t} = useTranslation(["account"]);
  const layout = useAppSelector((x) => x.style.mainLayout);
  if(tier !== 2) return;

  return (<Div
      fx
      gap={24}
      column
      alignItems="flex-start"
    >
      <Vector border borderColor="brown-4" p={20} as={SvgVerification} width={40} height={40} />   
        <Heading as="h3" size={24} textTransform="uppercase" fontWeight="regular">{t('verification.header')}</Heading>
        <Span>
        {t('verification.tiers.tier3.description')}
        </Span>    
        <Button
          kind={ "primary-yellow"}      
          label={t("verification.tiers.tier3.action")}
          onClick={() => {}}
        />
  </Div>)
};