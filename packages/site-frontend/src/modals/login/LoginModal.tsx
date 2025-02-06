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
      <Div fy>
        <Conditional
          value={bodyLayout}
          laptop={<LoginBanner />}
          desktop={<LoginBanner />}
        />
        <Div
          className="login-content"
          column
        >
          <ModalBody>
            <Conditional
              value={action}
              login={<LocalAuthBody setAction={setAction} />}
              register={<LocalRegisterBody setAction={setAction} />}
              recover={<RecoverBody setAction={setAction} />}
            />
          </ModalBody>
        </Div>
      </Div>
    </Modal>
  );
};
