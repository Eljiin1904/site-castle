import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { SvgBets } from "#app/svgs/common/SvgBets";
import { CardSection } from "@client/comps/cards/CardSection";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";
import { SvgTransaction } from "@client/svgs/common/SvgTransaction";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useMostPopularGame } from "./useMostPopularGame";

export const StatsWidgets = () => {

  const {t} = useTranslation(["account"]);
  const stats = useAppSelector((x) => x.user.stats);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile" || layout === "tablet";
  const popularGameData = useMostPopularGame();
  if(!stats)
    return null;  
  
  return (<Div
    fx
    gap={24}
    wrap={small}
  >
    <StatWidget
      title={t(`games:${popularGameData?.game}`)}
      description={t('stats.mostPopularGame')}
      icon={popularGameData.icon ?? SvgBets} />
    <StatWidget
      tokens={stats.wagerAmount}
      description={t('stats.totalWagered')}
      icon={SvgTransaction} />
    <StatWidget
       tokens={stats.rewardAmount}
      description={t('stats.totalRewards')}
      icon={SvgBets} />
  </Div>)
};

const StatWidget = ({title, tokens, description,icon}:{
  title?:string,
  tokens?: number;
  description:string,
  icon:Svg
}) => {
  
    const layout = useAppSelector((x) => x.style.mainLayout);
    const small = layout === "mobile" || layout === "tablet";
    return (<CardSection border borderColor="brown-4" position="header" grow fx gap={16} px={small ? 20: 16} alignItems="center" justifyContent="space-between">
          <Div column gap={12} grow>
            {tokens !== undefined && <Tokens fontSize={24} value={tokens} justifyContent="flex-start" />}
            {title !== undefined && <Heading  
              as="h3"
              size={24}
              fontWeight="regular"
              textTransform="uppercase">
               {title}
            </Heading>}            
            <Span>{description}</Span>
          </Div>
          <Div bg="brown-4" py={16} px={16}>
            <Vector as={icon} color="sand" size={24} />
          </Div>
    </CardSection>);
};