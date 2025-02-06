import { Div } from "@client/comps/div/Div";
import { AppNotifications } from "../notifications/AppNotifications";
import { UserMenu } from "./UserMenu";
import { SiteBalance } from "./SiteBalance";
import { ChatToggle } from "./ChatToggle";

export const HeaderUser = () => {
  return (
    <Div
      className="HeaderUser"
      align="center"
      gap={12}
    >
      <SiteBalance />
      <AppNotifications />
      <ChatToggle />
      <UserMenu />
    </Div>
  );
};
