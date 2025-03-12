import { useState } from "react";
import { Strings } from "@core/services/strings";
import { UserDocument } from "@core/types/users/UserDocument";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { Conditional } from "@client/comps/conditional/Conditional";
import { UserTokenCreditForm } from "./UserTokenCreditForm";
import { UserTokenDebitForm } from "./UserTokenDebitForm";

export const UserTokenModal = ({ user }: { user: UserDocument }) => {
  const [kindIndex, setKindIndex] = useState(0);
  const kinds: ("credit" | "debit")[] = ["credit", "debit"];
  const kind = kinds[kindIndex];

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Token Balance"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <ButtonGroup
          fx
          fill
          options={kinds.map((x) => Strings.camelCaseToTitle(x))}
          value={kindIndex}
          setValue={setKindIndex}
        />
        <Conditional
          value={kind}
          credit={<UserTokenCreditForm user={user} />}
          debit={<UserTokenDebitForm user={user} />}
        />
      </ModalBody>
    </Modal>
  );
};
