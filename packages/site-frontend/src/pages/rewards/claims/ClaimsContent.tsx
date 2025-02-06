import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Rewards } from "#app/services/rewards";
import { ClaimsFooter } from "./ClaimsFooter";
import { ClaimsTable } from "./ClaimsTable";

export const ClaimsContent = () => {
  const limit = 10;
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["reward-claims", limit, page],
    queryFn: () => Rewards.getClaims({ limit, page }),
  });

  const claims = query.data?.claims || [];

  const handleClaim = (claimId: string) =>
    Dialogs.open(
      "secondary",
      <ConfirmModal
        heading="Claim Reward"
        message="Are you sure you want to claim the reward?"
        onConfirm={async () => {
          await Rewards.claim({ claimId });
          Toasts.success("Reward claimed.");
          query.refetch();
        }}
      />,
    );

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
    <Div
      fx
      column
    >
      <ClaimsTable
        claims={claims}
        isLoading={query.isLoading}
        onClaim={handleClaim}
      />
      <ClaimsFooter
        page={page}
        hasNext={claims.length !== 0 && claims.length % limit === 0}
        setPage={setPage}
      />
    </Div>
  );
};
