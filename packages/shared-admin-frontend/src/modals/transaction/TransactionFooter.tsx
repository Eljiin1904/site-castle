import { useQueryClient } from "@tanstack/react-query";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { ModalFooter } from "@client/comps/modal/ModalFooter";
import { Button } from "@client/comps/button/Button";
import { Link } from "@client/comps/link/Link";
import { Dialogs } from "@client/services/dialogs";
import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Toasts } from "@client/services/toasts";
import { Cryptos } from "#app/services/cryptos";
import { Market } from "#app/services/market";
import config from "#app/config";

export const TransactionFooter = ({
  transaction,
}: {
  transaction: TransactionDocument;
}) => {
  const queryClient = useQueryClient();

  const handleAction = ({
    heading,
    message,
    success,
    queryKey,
    action,
  }: {
    heading: string;
    message: string;
    success: string;
    queryKey?: string;
    action: () => Promise<void>;
  }) =>
    Dialogs.open(
      "secondary",
      <ConfirmModal
        heading={heading}
        message={message}
        onConfirm={async () => {
          await action();

          if (queryKey) {
            queryClient.invalidateQueries({
              predicate: (x) => x.queryKey[0] === queryKey,
            });
          }

          Toasts.success(success);

          Dialogs.close("primary");
        }}
      />,
    );

  return (
    <ModalFooter gap={16}>
      <Button
        fx
        kind="secondary"
        label="Close"
        onClick={() => Dialogs.close("primary")}
      />
      {transaction.kind === "deposit-crypto" &&
        transaction.status === "pending" && (
          <Button
            fx
            kind="secondary"
            label="Confirm Deposit"
            onClick={() =>
              handleAction({
                heading: "Confirm Deposit",
                message: "Are you sure?",
                success: "Deposit confirmed.",
                action: () =>
                  Cryptos.confirmDeposit({
                    transactionId: transaction._id,
                  }),
              })
            }
          />
        )}
      {transaction.kind === "withdraw-crypto" &&
        ["pending", "processing"].includes(transaction.status) && (
          <Button
            fx
            kind="secondary"
            label="Cancel Withdraw"
            onClick={() =>
              handleAction({
                heading: "Cancel Withdraw",
                message: "Are you sure?",
                success: "Withdraw cancelled.",
                queryKey: "crypto-withdraws",
                action: () =>
                  Cryptos.cancelWithdraw({
                    transactionId: transaction._id,
                  }),
              })
            }
          />
        )}
      {transaction.kind === "withdraw-crypto" &&
        transaction.status === "pending" && (
          <Button
            fx
            kind="primary"
            label="Approve Withdraw"
            onClick={() =>
              handleAction({
                heading: "Approve Withdraw",
                message: "Are you sure?",
                success: "Withdraw approved.",
                queryKey: "crypto-withdraws",
                action: () =>
                  Cryptos.approveWithdraw({
                    transactionId: transaction._id,
                  }),
              })
            }
          />
        )}
      {transaction.kind === "withdraw-skin" &&
        ["pending", "processing"].includes(transaction.status) && (
          <Button
            fx
            kind="secondary"
            label="Cancel Withdraw"
            onClick={() =>
              handleAction({
                heading: "Cancel Withdraw",
                message: "Are you sure?",
                success: "Withdraw cancelled.",
                queryKey: "skin-withdraws",
                action: () =>
                  Market.cancelWithdraw({
                    transactionId: transaction._id,
                  }),
              })
            }
          />
        )}
      {transaction.kind === "withdraw-skin" &&
        transaction.status === "pending" && (
          <Button
            fx
            kind="primary"
            label="Approve Withdraw"
            onClick={() =>
              handleAction({
                heading: "Approve Withdraw",
                message: "Are you sure?",
                success: "Withdraw approved.",
                queryKey: "skin-withdraws",
                action: () =>
                  Market.approveWithdraw({
                    transactionId: transaction._id,
                  }),
              })
            }
          />
        )}
      {(transaction.kind === "case-battle-join" ||
        transaction.kind === "case-battle-won") && (
        <Link
          type="a"
          href={`${config.siteURL}/case-battles/${transaction.gameId}`}
          hover="none"
          fx
        >
          <Button
            kind="secondary"
            label="View Battle"
            fx
            onClick={() => Dialogs.close("primary")}
          />
        </Link>
      )}
    </ModalFooter>
  );
};
