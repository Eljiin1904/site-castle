import { Div } from "@client/comps/div/Div";
import { BetHeaderColumn } from "./BetHeaderColumn";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SiteGame } from "@core/types/site/SiteGame";

export const BetHeader = ({game = 'all'}: {game?: SiteGame | 'all'}) => {

  const {t} = useTranslation();
  return (
    <Div
      className="BetHeader"
      height={56}
      align="center"
      gap={24}
      py={12}
      borderWidth={1}
      borderColor="brown-4"
      borderTop
      borderBottom
    >
      {game === 'all' && <BetHeaderColumn header={t('bets.headers.game')} flexBasis={0} grow={3} />}
      <BetHeaderColumn header={t('bets.headers.user')} flexBasis={0} grow={4}  hideInMobile={true}/>
      <BetHeaderColumn header={t('bets.headers.time')} flexBasis={0} grow={3} hideInMobile={true} />
      <BetHeaderColumn header={t('bets.headers.amount')} flexBasis={0} grow={4}  hideInMobile={true}/>
      <BetHeaderColumn header={t('bets.headers.multiplier')} flexBasis={0} grow={2} />
      <BetHeaderColumn header={t('bets.headers.payout')} flexBasis={0} grow={3} justify={"flex-end"}/>
    </Div>
  );
};