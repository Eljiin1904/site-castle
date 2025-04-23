import { Chart } from "#app/comps/charts/Chart";
import { Heading } from "@client/comps/heading/Heading";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useQuery } from "@tanstack/react-query";
import { Users } from "#app/services/users";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const PnLChart = () => {

  const dateRange = useAppSelector((state) => state.account.userStatsDateRange);
  const game = useAppSelector((state) => state.account.userStatsCategory);
  const small = useIsMobileLayout();

  const query = useQuery({
    queryKey: ["history", dateRange, game ],
    queryFn: () => Users.getTransactionsByDateRange({dateRange, category:game, type:'pnl'}),
    placeholderData: (prev) => prev,
  });
  
  const values = query.data?.values || [];
  const total = query.data?.total || 0;
  return (<Chart small={small} label={<PnLChatHeader total={total} />} values={values} />);
};

const PnLChatHeader = ({total}:{
  total: number
}) => {

  const dateRange = useAppSelector((state) => state.account.userStatsDateRange);
  const game = useAppSelector((state) => state.account.userStatsCategory);
  const {t} = useTranslation(["account","games"]);
  const small = useIsMobileLayout();
  const gameKey = game ? game : 'all_games';
  const gameLabel = t(`games:${gameKey.replaceAll('-', '_')}`);
  const dateRangeKey = dateRange ? dateRange : 'thisMonth';
  const dateRangeLabel = t(`stats.dateranges.${dateRangeKey}`);
  const chartHeader = t("stats.charts.pnl", {period: dateRangeLabel, game: gameLabel});
  
  return (<Div gap={4} center>
    <Heading as="h3" fontWeight="bold" size={small ? 12: 16} textTransform="uppercase" color="light-sand">{chartHeader}</Heading>
    <Tokens color="sand"  fontSize={small ? 12: 16} family="title" value={total} />
  </Div>)
}