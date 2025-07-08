import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { setDemoMode } from "#app/services/users/Users";
import { Div } from "@client/comps/div/Div"
import { Span } from "@client/comps/span/Span"
import { Toggle } from "@client/comps/toggle/Toggle";
import { Dialogs } from "@client/services/dialogs";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * DemoToggle component.
 * This component provides a toggle for enabling or disabling demo mode for hub88 and original games.
 * It checks if the user is authenticated before allowing the toggle to turn off demo mode.
 * If the user is not authenticated and tries to turn off demo mode, it opens the login modal.
 * @returns A toggle for demo mode.
 */
export const DemoToggle = () => {

  const authenticated = useAppSelector((state) => state.user.authenticated);
  const demoMode = useAppSelector((state) => state.user.demoMode);
  const dispatch = useDispatch();  
  const { t } = useTranslation(['games']);

  /*
    * Effect to set demo mode based on authentication status.
    * If the user is authenticated, demo mode is set to false.
    * If the user is not authenticated, demo mode is set to true.
    * This effect runs only once when the component mounts or when the authentication status changes.
    */
  useEffect(() => {
    dispatch(setDemoMode(!authenticated));
    return () => {
      // Cleanup function to reset demo mode when component unmounts
      dispatch(setDemoMode(false));
    }
  },[authenticated]);

  /**
   * Handle change of demo mode.
   * If demo mode is on, only change if authenticated, if not authenticated show login modal.
   * If demo mode is off, toggle it on.
   * @returns void
   */
  const handleChangeDemoMode = () => {
    if(demoMode && !authenticated)
      return Dialogs.open("primary", <LoginModal />);
    dispatch(setDemoMode(!demoMode));
  };

  return (<Div gap={12} alignItems="center">
    <Span>{t('demoMode')}</Span>
    <Toggle id="demoModeToggle" kind="secondary" value={demoMode} onChange={handleChangeDemoMode} />
  </Div>);
}