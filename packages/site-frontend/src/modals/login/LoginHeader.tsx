import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { LoginAction } from "./LoginAction";

export const LoginHeader = ({
  action,
  setAction,
}: {
  action: LoginAction;
  setAction: (x: LoginAction) => void;
}) => {
  return (
    <ModalHeader
      onCloseClick={() => Dialogs.close("primary")}
      heading={[
        {
          label: "Login",
          active: action === "login" || action === "recover",
          onClick: () => setAction("login"),
        },
        {
          label: "Register",
          active: action === "register",
          onClick: () => setAction("register"),
        },
      ]}
    />
  );
};
