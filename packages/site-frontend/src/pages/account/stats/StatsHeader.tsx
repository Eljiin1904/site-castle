import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Transactions } from "@client/services/transactions";
import { SvgCalendar } from "#app/svgs/common/SvgCalendar";
import { DateRangeType } from "@core/services/transactions/Transactions";
import { TransactionCategory } from "@core/types/transactions/TransactionCategory";


export const StatsHeader = ({dateRange, setDateRange, chartOption = 'wagered',setChartOption, category, setCategory}: {
  dateRange: DateRangeType;
  setDateRange: (x: DateRangeType) => void;
  chartOption: 'wagered' | 'pnl';
  setChartOption: (x: 'wagered' | 'pnl') => void;
  category: TransactionCategory | undefined;  
  setCategory: (x: TransactionCategory | undefined) => void;
}) => {
  const small = useIsMobileLayout();
  const { t } = useTranslation(["account"]);
  const indexes = Transactions.dateranges.map((x) => t(`stats.dateranges.${x}`));
  const chartOptions = ['wagered','pnl'];

  return (
    <Div
      justify={small ? "space-between" : "space-between"}
      column={small}
      pt={small ? 24 : 0}
      gap={small ? 16 : 24}
      wrap
    >
      <PageTitle
        heading={t('stats.title')}
        width={0}
      />
      <Div wrap style={{
        columnGap: small ? 16 : 24,
        rowGap: 16,
      }}>
        <Dropdown
          type="select"
          fx={small}
          size="sm"
          options={chartOptions.map((x) => t(`stats.${x}`))}
          value={chartOptions.indexOf(chartOption)}
          onChange={(x, i) => 
            setChartOption(
              chartOptions[i] as 'pnl' | 'wagered',
            )
          }
        />
        <Dropdown
          type="select"
          fx={small}
          size="sm"
          options={['all_games', ...Transactions.gameCategories].map((x) => t(`games:${x.replaceAll('-', '_')}`))}
          value={
            category ? Transactions.gameCategories.indexOf(category) + 1 : 0
          }
          onChange={(x, i) =>
            setCategory(
              i === 0 ? undefined : Transactions.gameCategories[i - 1],
            )
          }
        />
        <Dropdown
          type="select"
          icon={SvgCalendar}
          fx={small}
          size="sm"
          options={indexes}
          value={
            dateRange ? Transactions.dateranges.indexOf(dateRange): 0
          }
          onChange={(x, i) => 
            setDateRange(Transactions.dateranges[i])
          }
        />
      </Div>
    </Div>
  );
};
