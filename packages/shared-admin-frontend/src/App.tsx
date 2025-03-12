import { BrowserRouter } from "react-router-dom";
import { AppBody } from "@client/app/body/AppBody";
import { AppDialog } from "@client/app/dialog/AppDialog";
import { AppTooltip } from "@client/app/tooltip/AppTooltip";
import { AppMain } from "@client/app/main/AppMain";
import { AppToasts } from "@client/app/toasts/AppToasts";
import { Div } from "@client/comps/div/Div";
import { AppErrorBoundary } from "./app/errors/AppErrorBoundary";
import { AppFooter } from "./app/footer/AppFooter";
import { AppHeader } from "./app/header/AppHeader";
import { AppHelmet } from "./app/helmet/AppHelmet";
import { AppServices } from "./app/services/AppServices";
import { AppManager } from "./app/manager/AppManager";
import { AppMenu } from "./app/menu/AppMenu";
import { AppProvider } from "./app/provider/AppProvider";
import { AppRouter } from "./app/router/AppRouter";

export function App() {
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
              <Div
                fy
                overflow="hidden"
              >
                <AppMenu />
                <AppMain>
                  <AppHeader />
                  <AppToasts />
                  <AppRouter />
                  <AppFooter />
                </AppMain>
              </Div>
            </AppBody>
          </AppManager>
        </AppProvider>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
