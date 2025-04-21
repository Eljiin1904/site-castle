import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { SvgCheck } from "@client/svgs/common/SvgCheck";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const VerificationHeader = ({tier}: {
  tier: number}) => {
  
  const { t } = useTranslation(["account"]);

  return (
    <Div
      align="center"
      column
      gap={40}
    >
     <PageTitle
        heading={t('verification.header')}
      />
      <Div fx gap={16} borderBottom borderColor="brown-4" pb={24}>
        <VerificationTierHeader tier={1} label={t('verification.tiers.tier1.title')} currenTier={tier}/>
        <VerificationHeaderNextToken />
        <VerificationTierHeader tier={2} label={t('verification.tiers.tier2')} currenTier={tier}/>
        <VerificationHeaderNextToken />
        <VerificationTierHeader tier={3} label={t('verification.tiers.tier3.title')} currenTier={tier}/>
        <VerificationHeaderNextToken />
        <VerificationTierHeader tier={4} label={t('verification.tiers.tier4')} currenTier={tier}/>
        <VerificationHeaderNextToken />
        <VerificationTierHeader tier={5} label={t('verification.tiers.tier5')} currenTier={tier}/>
      </Div>
    </Div>
  );
};

const VerificationTierHeader = ({tier, label, currenTier}: {
  tier: number;
  label: string;
  currenTier: number
}) => {

  const small = useIsMobileLayout();
  return (<Div 
      fx={!small} 
      center 
      gap={small ? 0: 24}
      height={small ? 24: 40}
      bg={tier - 1 === currenTier? "brown-4" : "dark-brown"}
      border = {!small}
      borderColor="brown-4"
      justifyContent="flex-start"
      p={small ? 0: 8}
    >
    <Span
      color={tier - 1 === currenTier ? "dark-brown" : (tier - 1 < currenTier ? "bright-green" : "dark-sand")}
      bg={tier - 1 === currenTier ? "sand" : undefined}
      border
      borderColor={tier - 1 < currenTier ? "bright-green" : "brown-4"}
      px={8}
    >
    {tier - 1 < currenTier ? <Vector as={SvgCheck} size={12} color="bright-green"/> : tier}
    </Span>
    {!small && <Span
      color={tier - 1 === currenTier ? "sand" : undefined}
    >
      {label}
    </Span>}
  </Div>)
};

const VerificationHeaderNextToken = () => {

  return (<Vector as={SvgArrowRight} size={12} style={{transform:'rotate(270deg)'}} />);
};