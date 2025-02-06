import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { Rewards } from "#app/services/rewards";
import { CasesBanner } from "./CasesBanner";
import { LevelCaseGrid } from "./LevelCaseGrid";

export const CasesBody = () => {
  const query = useQuery({
    queryKey: ["reward-cases"],
    queryFn: () => Rewards.getLevelCases(),
  });

  const chests = query.data?.chests;

  if (query.error) {
    return (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please refetch page."
        buttonLabel="Refetch Page"
        description={Errors.getMessage(query.error)}
        onButtonClick={query.refetch}
      />
    );
  }

  return (
    <Fragment>
      <CasesBanner />
      <LevelCaseGrid chests={chests} />
    </Fragment>
  );
};
