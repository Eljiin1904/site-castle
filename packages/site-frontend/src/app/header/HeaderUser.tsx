import { Div } from "@client/comps/div/Div";
import { AppNotifications } from "../notifications/AppNotifications";
import { UserMenu } from "./UserMenu";
import { SiteBalance } from "./SiteBalance";
import { ChatToggle } from "./ChatToggle";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const HeaderUser = () => {
  
  const small =  useIsMobileLayout();
  return (
    <Div
      className="HeaderUser"
      align="center"
      gap={small ? 24 : 8}
    >
      <SiteBalance />
      <ChatToggle />
      <AppNotifications />      
      <UserMenu />
    </Div>
  );
};
