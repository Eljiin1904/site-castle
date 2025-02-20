import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { LoginModal } from "#app/modals/login/LoginModal";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const HeaderGuest = () => {
  const small = useIsMobileLayout();

  return (
    <Div gap={16}>
      <Button
        kind="primary"
        size={small ? "sm" : "md"}
        label="Log In"
        labelWeight="medium"
        labelSize={16}
        style={{
          minWidth: small ? "75px" : "90px",
        }}
        onClick={() => Dialogs.open("primary", <LoginModal initialAction="login" />)}
      />
      <Button
        kind="secondary"
        size={small ? "sm" : "md"}
        label="Register"
        labelWeight="medium"
        labelSize={16}
        style={{
          minWidth: small ? "75px" : "90px",
        }}
        onClick={() => Dialogs.open("primary", <LoginModal initialAction="register" />)}
      />
    </Div>
  );
};
