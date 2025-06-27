import { differenceInMinutes, isFuture } from "date-fns";
import { SvgFlag } from "@client/svgs/common/SvgFlag";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MenuItem } from "./MenuItem";
import SvgRace from "../../../svgs/race/SvgRace";

export const MenuRace = ({ collapsed }: { collapsed: boolean }) => {
  const race = useAppSelector((x) => x.site.meta.race);
  console.log(`Current race `,race);
  if (!race) {
    return null;
  }

  const endingSoon = isFuture(race.endDate) && differenceInMinutes(race.endDate, Date.now()) < 60;

  return (
    <MenuItem
      icon={SvgRace}
      label={race.displayName}
      subText={
        <Timestamp
          className="fade-content"
          format="timer"
          color={endingSoon ? "double-red" : "dark-sand"}
          size={12}
          // lineHeight={16}
          date={race.endDate}
        />
      }
      to="/race"
      type="nav"
      showLabel={!collapsed}
    />
  );
};
