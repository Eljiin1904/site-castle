import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserDocument } from "@core/types/users/UserDocument";
import { Div } from "@client/comps/div/Div";
import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Affiliates } from "#app/services/affiliates";
import { KeysHeader } from "./KeysHeader";
import { KeysTable } from "./KeysTable";
import { KeysFooter } from "./KeysFooter";

export const KeysBody = ({ user }: { user: UserDocument }) => {
  const affiliateId = user._id;
  const limit = 12;
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["affiliate-keys", affiliateId, limit, page],
    queryFn: () => Affiliates.getKeys({ affiliateId, limit, page }),
    placeholderData: (prev) => prev,
  });

  const keys = query.data?.keys || [];

  const handleCreate = () =>
    Dialogs.open(
      "secondary",
      <ConfirmModal
        heading="Create Key"
        message="Are you sure you want to create a key?"
        onConfirm={async () => {
          await Affiliates.createKey({ affiliateId });
          Toasts.success("Key created.");
          query.refetch();
        }}
      />,
    );

  const handleDisable = (keyId: string) =>
    Dialogs.open(
      "secondary",
      <ConfirmModal
        heading="Disable Key"
        message="Are you sure you want to disable the key?"
        onConfirm={async () => {
          await Affiliates.disableKey({ keyId });
          Toasts.success("Key disabled.");
          query.refetch();
        }}
      />,
    );

  return (
    <Div
      fx
      column
    >
      <KeysHeader
        isLoading={query.isLoading}
        onRefreshClick={query.refetch}
        onCreateClick={handleCreate}
      />
      <KeysTable
        keys={keys}
        isLoading={query.isLoading}
        onDisableClick={handleDisable}
      />
      <KeysFooter
        page={page}
        hasNext={keys.length !== 0 && keys.length % limit === 0}
        setPage={setPage}
      />
    </Div>
  );
};
