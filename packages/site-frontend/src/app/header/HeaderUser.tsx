import { Div } from "@client/comps/div/Div";
import { AppNotifications } from "../notifications/AppNotifications";
import { UserMenu } from "./UserMenu";
import { SiteBalance } from "./SiteBalance";
import { ChatToggle } from "./ChatToggle";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { LanguageSelector } from "./LanguageSelector";

export const HeaderUser = () => {
  
  const small =  useIsMobileLayout();
  return (
    <Div
      className="HeaderUser"
      align="center"
      gap={small ? 16 : 12}
    >
      <LanguageSelector />
      <ChatToggle />
      <AppNotifications />      
      <UserMenu />
    </Div>
  );
};
