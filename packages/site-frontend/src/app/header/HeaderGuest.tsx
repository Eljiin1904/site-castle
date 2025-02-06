import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { LoginModal } from "#app/modals/login/LoginModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const HeaderGuest = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);

  return (
    <Div gap={12}>
      <Button
        kind="primary"
        size="sm"
        label="Log In"
        style={{
          minWidth: layout === "mobile" ? "75px" : "90px",
        }}
        onClick={() => Dialogs.open("primary", <LoginModal initialAction="login" />)}
      />
      <Button
        kind="primary"
        size="sm"
        label="Register"
        style={{
          minWidth: layout === "mobile" ? "75px" : "90px",
        }}
        onClick={() => Dialogs.open("primary", <LoginModal initialAction="register" />)}
      />
    </Div>
  );
};
