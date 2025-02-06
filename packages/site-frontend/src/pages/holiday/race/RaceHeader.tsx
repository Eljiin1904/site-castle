import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgFlag } from "@client/svgs/common/SvgFlag";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { Vector } from "@client/comps/vector/Vector";
import { SvgClock } from "@client/svgs/common/SvgClock";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const RaceHeader = () => {
  const endDate = useAppSelector((x) => x.holiday.race.endDate);

  return (
    <Div height={40}>
      <PageTitle
        heading="Leaderboard"
        icon={SvgFlag}
      />
      <Div
        px={12}
        py={10}
        gap={6}
        center
        bg="brown-8"
        border
        borderColor="light-blue"
      >
        <Vector as={SvgClock} />
        <Timestamp
          format="timer"
          date={endDate}
          color="light-gray"
          weight="semi-bold"
        />
      </Div>
    </Div>
  );
};
