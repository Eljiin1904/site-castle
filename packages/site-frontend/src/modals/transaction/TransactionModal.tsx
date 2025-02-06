import { useQuery } from "@tanstack/react-query";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalError } from "@client/comps/modal/ModalError";
import { ModalLoading } from "@client/comps/modal/ModalLoading";
import { Users } from "#app/services/users";
import { TransactionBody } from "./TransactionBody";

export const TransactionModal = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const query = useQuery({
    queryKey: [transactionId],
    queryFn: () => Users.getTransaction({ transactionId }),
  });

  const transaction = query.data?.transaction;

  let bodyContent;

  if (query.error) {
    bodyContent = <ModalError error={query.error} />;
  } else if (!transaction) {
    bodyContent = <ModalLoading />;
  } else {
    bodyContent = <TransactionBody transaction={transaction} />;
  }

  return (
    <Modal
      className="TransactionModal"
      onBackdropClick={() => Dialogs.close("primary")}
      width="sm"
    >
      <ModalHeader
        heading="Transaction"
        onCloseClick={() => Dialogs.close("primary")}
      />
      {bodyContent}
    </Modal>
  );
};
