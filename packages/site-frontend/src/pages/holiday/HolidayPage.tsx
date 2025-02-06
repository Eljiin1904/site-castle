import { SitePage } from "#app/comps/site-page/SitePage";
import { HolidayContent } from "./HolidayContent";
import { HolidayManager } from "./HolidayManager";

export const HolidayPage = () => {
  return (
    <SitePage
      className="HolidayPage"
      title="Holiday Event"
    >
      <HolidayManager />
      <HolidayContent />
    </SitePage>
  );
};
