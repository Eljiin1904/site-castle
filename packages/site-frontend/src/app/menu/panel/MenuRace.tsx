import { differenceInMinutes, isFuture } from "date-fns";
import { SvgFlag } from "@client/svgs/common/SvgFlag";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MenuItem } from "./MenuItem";

export const MenuRace = ({ collapsed }: { collapsed: boolean }) => {
  const race = useAppSelector((x) => x.site.meta.race);

  if (!race) {
    return null;
  }

  const endingSoon =
    isFuture(race.endDate) &&
    differenceInMinutes(race.endDate, Date.now()) < 60;

  return (
    <MenuItem
      icon={SvgFlag}
      label={race.displayName}
      subText={
        <Timestamp
          className="fade-content"
          format="timer"
          color={endingSoon ? "light-red" : "dark-gray"}
          size={12}
          date={race.endDate}
        />
      }
      to="/race"
      showLabel={!collapsed}
    />
  );
};
