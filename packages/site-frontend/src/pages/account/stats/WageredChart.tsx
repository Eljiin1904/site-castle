import { Chart } from "#app/comps/charts/Chart";
import { Heading } from "@client/comps/heading/Heading";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { DateRangeType } from "@core/services/transactions/Transactions";
import { TransactionType } from "aws-sdk/clients/lakeformation";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useQuery } from "@tanstack/react-query";
import { Users } from "#app/services/users";

export const WageredChart = ({dateRange, game}:{
  dateRange: DateRangeType,
  game: TransactionType | undefined,
}) => {

  const query = useQuery({
    queryKey: ["history", dateRange, game ],
    queryFn: () => Users.getTransactionsByDateRange({dateRange, category:game, type:'wagered'}),
    placeholderData: (prev) => prev,
  });
  
  const values = query.data?.values || [];
  const total = query.data?.total || 0;
  
  return (<Chart strokeColor="sand" label={<WageredChatHeader daterange={dateRange} game={game} total={total} />} values={values} />);
};

const WageredChatHeader = ({daterange, game = 'all_games', total}:{
  daterange: DateRangeType,
  game: TransactionType | undefined,
  total: number,
}) => {

  const {t} = useTranslation(["account","games"]);
  const gameKey = game ? game : 'all_games';
  const gameLabel = t(`games:${gameKey.replaceAll('-', '_')}`);
  const dateRangeKey = daterange ? daterange : 'thisMonth';
  const dateRangeLabel = t(`stats.dateranges.${dateRangeKey}`);
  const chartHeader = t("stats.charts.wagered", {period: dateRangeLabel, game: gameLabel});
  
  return (<Div gap={4} center>
    <Heading as="h3" fontWeight="bold" textTransform="uppercase" color="light-sand">{chartHeader}</Heading>
    <Tokens color="sand" fontSize={16} family="title" value={total} />
  </Div>)
}