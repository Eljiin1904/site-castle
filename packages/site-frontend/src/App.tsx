import { BrowserRouter } from "react-router-dom";
import { AppBody } from "@client/app/body/AppBody";
import { AppDialog } from "@client/app/dialog/AppDialog";
import { AppTooltip } from "@client/app/tooltip/AppTooltip";
import { AppMain } from "@client/app/main/AppMain";
import { AppToasts } from "@client/app/toasts/AppToasts";
import { Div } from "@client/comps/div/Div";
import { AppErrorBoundary } from "./app/errors/AppErrorBoundary";
import { AppAnnouncement } from "./app/announcement/AppAnnouncement";
import { AppCookieNotice } from "./app/cookie-notice/AppCookieNotice";
import { AppFooter } from "./app/footer/AppFooter";
import { AppHeader } from "./app/header/AppHeader";
import { AppHelmet } from "./app/helmet/AppHelmet";
import { AppServices } from "./app/services/AppServices";
import { AppManager } from "./app/manager/AppManager";
import { AppProvider } from "./app/provider/AppProvider";
import { AppRouter } from "./app/router/AppRouter";
import { AppMenuPanel } from "./app/menu/AppMenuPanel";
import { AppMenuBar } from "./app/menu/AppMenuBar";
import { AppMenuOverlay } from "./app/menu/AppMenuOverlay";
import { AppEffects } from "./app/effects/AppEffects";
import { AppChatPanel } from "./app/chat/AppChatPanel";
import { AppChatOverlay } from "./app/chat/AppChatOverlay";
import { AppBackground } from "./app/background/AppBackground";

export const App = () => {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <AppHelmet />
          <AppServices />
          <AppManager>
            <AppBody bg="brown-7">
              <AppDialog />
              <AppTooltip />
              <AppAnnouncement />
              <AppEffects />
              <AppBackground />
              <Div
                fy
                overflow="hidden"
              >
                <AppMenuPanel />
                <AppMain>
                  <AppHeader />
                  <AppToasts />
                  <AppRouter />
                  <AppFooter />
                  <AppCookieNotice />
                </AppMain>
                <AppChatPanel />
              </Div>
              <AppMenuOverlay />
              <AppMenuBar />
              <AppChatOverlay />
            </AppBody>
          </AppManager>
        </AppProvider>
      </BrowserRouter>
    </AppErrorBoundary>
  );
};
