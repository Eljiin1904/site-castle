import { useQuery } from "@tanstack/react-query";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Transactions } from "#app/services/transactions";
import { TransactionBody } from "./TransactionBody";
import { TransactionFooter } from "./TransactionFooter";

export const TransactionModal = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const query = useQuery({
    queryKey: [transactionId],
    queryFn: () => Transactions.getTransaction({ transactionId }),
  });

  const transaction = query.data?.transaction;

  return (
    <Modal
      className="TransactionModal"
      onBackdropClick={() => Dialogs.close("primary")}
      width="lg"
    >
      <ModalHeader
        heading="Transaction"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <TransactionBody
        transaction={transaction}
        error={query.error}
      />
      {transaction && <TransactionFooter transaction={transaction} />}
    </Modal>
  );
};
