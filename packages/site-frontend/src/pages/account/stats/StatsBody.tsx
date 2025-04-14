import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { StatsHeader } from "./StatsHeader";
import { StatCardGrid } from "./StatCardGrid";

export const StatsBody = () => {
  const { t } = useTranslation(["accounts","validations"]);

  // const query = useQuery({
  //   queryKey: ["history", category, limit, page],
  //   queryFn: () => Users.getTransactions({ category, limit, page, game: true }),
  //   placeholderData: (prev) => prev,
  // });

  // const transactions = query.data?.transactions || [];
  // const total = query.data?.total || 0;

  // if (query.error) {
  //   return (
  //     <PageNotice
  //       image="/graphics/notice-chicken-error"
  //       title="Error"
  //       message={t("errors.queries.history")}
  //       buttonLabel={t("history.refetch")}
  //       description={Errors.getMessage(query.error)}
  //       onButtonClick={query.refetch}
  //     />
  //   );
  // }
  return (
    <Div
      fx
      column
      gap={40}
    >
      <StatsHeader/>
      <Div fx column gap={16}>
        <StatCardGrid/>
      </Div>      
    </Div>
  );
};
