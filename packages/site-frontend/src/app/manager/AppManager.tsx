import { Fragment } from "react";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Users } from "#app/services/users";
import config from "#app/config";
import { AppLoadingNotice } from "./AppLoadingNotice";
import { AppMaintenanceNotice } from "./AppMaintenanceNotice";
import { AppMaintenanceOverlay } from "./AppMaintenanceOverlay";
import { AppOutdatedNotice } from "./AppOutdatedNotice";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const AppManager = ({ children }: { children: any }) => {
  const connected = useAppSelector((x) => x.socket.connected);

  const siteInitialized = useAppSelector((x) => x.site.initialized);

  const maintenance = useAppSelector((x) => x.site.settings.maintenance);

  const expectedVersion = useAppSelector((x) => x.site.settings.version);
  const { ready } = useTranslation();

  const isValidVersion =
    config.version === expectedVersion ||
    config.env === "development" ||
    config.env === "devcloud" ||
    config.env === "staging";

  const userInitialized = useAppSelector((x) => x.user.initialized);
  const role = useAppSelector((x) => x.user.role);
  const { maintenanceAccess } = Users.getPermissions(role);

  if (!connected || !siteInitialized || !userInitialized || !ready) {
    return <AppLoadingNotice />;
  } else if (maintenance) {
    if (maintenanceAccess) {
      return (
        <Fragment>
          <AppMaintenanceOverlay />
          {children}
        </Fragment>
      );
    } else {
      return <AppMaintenanceNotice />;
    }
  } else if (!isValidVersion) {
    return <AppOutdatedNotice />;
  }

  return children;
};
