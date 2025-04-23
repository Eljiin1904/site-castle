import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Transactions } from "@client/services/transactions";
import { SvgCalendar } from "#app/svgs/common/SvgCalendar";
import { DateRangeType } from "@core/services/transactions/Transactions";
import { Dialogs } from "@client/services/dialogs";
import { CustomRangeModal } from "#app/modals/transaction/CustomRangeModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useDispatch } from "react-redux";
import { Account } from "#app/services/account";


export const StatsHeader = () => {

  const category = useAppSelector((state) => state.account.userStatsCategory);
  const dateRange = useAppSelector((state) => state.account.userStatsDateRange);
  const chartOption = useAppSelector((state) => state.account.userStatsType);
  const userRegisterDate = useAppSelector((state) => state.user.registerDate);
  const dispatch = useDispatch();
  const { t } = useTranslation(["account"]);
  const indexes = Transactions.dateranges.map((x) => t(`stats.dateranges.${x}`));
  const small = useIsMobileLayout();
  const chartOptions = ['wagered','pnl'];

  const handleDateRangeChange = (x: string, i: number) => {
    const selectedDateRange = Transactions.dateranges[i];
    if (selectedDateRange === 'custom') {
      Dialogs.open("primary", <CustomRangeModal />);
    }
    else if(selectedDateRange === 'all') {
      dispatch(Account.setUserStatsMinDate(userRegisterDate));
      dispatch(Account.setUserStatsMaxDate(new Date()));
      dispatch(Account.setUserStatsDateRange(selectedDateRange as DateRangeType));
    }
    else
      dispatch(Account.setUserStatsDateRange(selectedDateRange as DateRangeType));
  };

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
          onChange={(x, i) => dispatch(Account.setUserStatsType(chartOptions[i] as 'pnl' | 'wagered'))}
        />
        <Dropdown
          type="select"
          fx={small}
          size="sm"
          options={['all_games', ...Transactions.gameCategories].map((x) => t(`games:${x.replaceAll('-', '_')}`))}
          value={
            category ? Transactions.gameCategories.indexOf(category) + 1 : 0
          }
          onChange={(x, i) => dispatch(Account.setUserStatsCategory(i === 0 ? undefined : Transactions.gameCategories[i - 1]))}
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
          onChange={handleDateRangeChange}
        />
      </Div>
    </Div>
  );
};
