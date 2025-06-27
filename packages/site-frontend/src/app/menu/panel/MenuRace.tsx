import { differenceInMinutes, isFuture } from "date-fns";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MenuItem } from "./MenuItem";
import SvgRace from "@client/svgs/common/SvgRace";
import { SiteRace } from "@core/types/site/SiteRace";

export const MenuRace = ({ collapsed }: { collapsed: boolean }) => {
  const races = useAppSelector((x) => x.site.meta.races);
 
  if (!races || races.length === 0) {
    return null;
  }

  return (
    <>
    {races.map(race => <RaceItem key={race.id} race={race} collapsed={collapsed} />)}
    </>);
};

const RaceItem = ({race, collapsed}:{
  race: SiteRace,
  collapsed: boolean
}) => {

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
          size={10}
          date={race.endDate}
        />
      }
      to={`race/${race.slug}`}
      type="nav"
      showLabel={!collapsed}
    />
  );
}
