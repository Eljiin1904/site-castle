import { differenceInMinutes, isFuture } from "date-fns";
import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Span } from "@client/comps/span/Span";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { Vector } from "@client/comps/vector/Vector";
import { SvgFlag } from "@client/svgs/common/SvgFlag";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const MenuRace = ({ onClick }: { onClick?: () => void }) => {
  const race = useAppSelector((x) => x.site.meta.race);

  if (!race) {
    return null;
  }

  const endingSoon =
    isFuture(race.endDate) &&
    differenceInMinutes(race.endDate, Date.now()) < 60;

  return (
    <Link
      display="flex"
      type="router"
      to="/race"
      fx
      alignItems="center"
      pl={18}
      py={12}
      bg="brown-7"
      hover="none"
      onClick={onClick}
    >
      <Vector
        as={SvgFlag}
        size={20}
        mr={14}
        color="light-gray"
      />
      <Div column>
        <Span>{race.displayName}</Span>
        <Timestamp
          format="timer"
          color={endingSoon ? "light-red" : "dark-gray"}
          size={12}
          date={race.endDate}
        />
      </Div>
    </Link>
  );
};
