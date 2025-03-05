import { useState } from "react";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Modal } from "@client/comps/modal/Modal";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { RegionBlockModal } from "../system/RegionBlockModal";
import { LoginAction } from "./LoginAction";
import { LoginBanner } from "./LoginBanner";
import { LocalAuthBody } from "./local-auth/LocalAuthBody";
import { LocalRegisterBody } from "./local-register/LocalRegisterBody";
import { RecoverBody } from "./recover/RecoverBody";
import "./LoginModal.scss";
import { ModalHeader } from "@client/comps/modal/ModalHeader";

export const LoginModal = ({ initialAction }: { initialAction?: LoginAction }) => {
  const [action, setAction] = useState<LoginAction>(initialAction || "login");
  const bodyLayout = useAppSelector((x) => x.style.bodyLayout);
  const restricted = useAppSelector((x) => x.user.restricted);

  if (restricted) {
    return <RegionBlockModal />;
  }
  return (
    <Modal
      className="LoginModal"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader onCloseClick={() => Dialogs.close("primary")} />
      <Div fy>
        <Conditional
          value={action}
          login={
            ["laptop", "desktop"].includes(bodyLayout) ? <LoginBanner action={action} /> : null
          }
          register={
            ["laptop", "desktop"].includes(bodyLayout) ? <LoginBanner action={action} /> : null
          }
        />
        <Div
          className={`${action}-content`}
          column
        >
          <ModalBody>
            <Conditional
              value={action}
              login={<LocalAuthBody setAction={setAction} />}
              register={<LocalRegisterBody />}
              recover={<RecoverBody />}
            />
          </ModalBody>
        </Div>
      </Div>
    </Modal>
  );
};
