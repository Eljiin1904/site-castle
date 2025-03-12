import { Fragment, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Dates } from "@core/services/dates";
import { PageLoading } from "@client/comps/page/PageLoading";
import { PageNotice } from "@client/comps/page/PageNotice";
import { PageNav } from "@client/comps/page/PageNav";
import { Errors } from "@client/services/errors";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Site } from "#app/services/site";
import { OverviewBody } from "./overview/OverviewBody";
import { DashboardHeader } from "./DashboardHeader";
import { DepositsBody } from "./deposits/DepositsBody";
import { WithdrawsBody } from "./withdraws/WithdrawsBody";
import { ProfitBody } from "./profit/ProfitBody";
import { GamesBody } from "./games/GamesBody";

export const DashboardPage = () => {
  const [timeIndex, setTimeIndex] = useState(0);
  const [minDate, setMinDate] = useState<Date>();
  const [maxDate, setMaxDate] = useState<Date>();

  const query = useQuery({
    queryKey: ["site-report", timeIndex, minDate, maxDate],
    queryFn: () =>
      Site.getReport({
        ...Dates.getMinMaxFromIndex({ timeIndex, minDate, maxDate }),
      }),
    placeholderData: (prev) => prev,
  });

  const report = query.data?.report;

  let bodyContent;

  if (query.error) {
    bodyContent = (
      <PageNotice
        image="/graphics/notice-Chicken-error"
        title="Error"
        message="Something went wrong, please refetch reports."
        buttonLabel="Refetch Reports"
        description={Errors.getMessage(query.error)}
        onButtonClick={query.refetch}
      />
    );
  } else if (report === undefined) {
    bodyContent = <PageLoading />;
  } else {
    bodyContent = (
      <Fragment>
        <DashboardHeader
          timeIndex={timeIndex}
          minDate={minDate}
          maxDate={maxDate}
          isLoading={query.isFetching}
          setTimeIndex={setTimeIndex}
          setMinDate={setMinDate}
          setMaxDate={setMaxDate}
          onRefreshClick={query.refetch}
        />
        <PageNav
          items={[
            { label: "Overview", to: "/dashboard", end: true },
            { label: "Deposits", to: "/dashboard/deposits" },
            { label: "Withdraws", to: "/dashboard/withdraws" },
            { label: "PnL", to: "/dashboard/profit" },
            { label: "Games", to: "/dashboard/games" },
          ]}
        />
        <Routes>
          <Route
            index
            element={<OverviewBody report={report} />}
          />
          <Route
            path="/deposits"
            element={<DepositsBody report={report} />}
          />
          <Route
            path="/withdraws"
            element={<WithdrawsBody report={report} />}
          />
          <Route
            path="/profit"
            element={<ProfitBody report={report} />}
          />
          <Route
            path="/games"
            element={<GamesBody report={report} />}
          />
          <Route
            path="*"
            element={
              <Navigate
                replace
                to="/dashboard"
              />
            }
          />
        </Routes>
      </Fragment>
    );
  }

  return (
    <SitePage
      className="DashboardPage"
      title="Dashboard"
    >
      {bodyContent}
    </SitePage>
  );
};
