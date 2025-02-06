import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgStar } from "@client/svgs/common/SvgStar";
import { Div } from "@client/comps/div/Div";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { Vector } from "@client/comps/vector/Vector";
import { SvgClock } from "@client/svgs/common/SvgClock";
import { Button } from "@client/comps/button/Button";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { Dialogs } from "@client/services/dialogs";
import { AdventInfoModal } from "#app/modals/rewards/AdventInfoModal";
import { Rewards } from "#app/services/rewards";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Span } from "@client/comps/span/Span";
import { SvgFast } from "@client/svgs/common/SvgFast";

export const AdventHeader = () => {
  const resetDate = useAppSelector((x) => x.holiday.event.adventResetDate);
  const nextDate = Rewards.getNextAdventDate({ resetDate });

  return (
    <Div height={40}>
      <PageTitle
        heading="Calendar"
        icon={SvgStar}
      />
      <Div gap={8}>
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
            date={nextDate}
            color="light-gray"
            weight="semi-bold"
          />
        </Div>
        <Div
          px={12}
          py={10}
          gap={6}
          center
          bg="dark-blue"
          border
          borderColor="white"
          hover="highlight"
          onClick={() => Dialogs.open("primary", <AdventInfoModal />)}
        >
          <Vector
            as={SvgFast}
            color="white"
          />
          <Span
            weight="medium"
            color="white"
          >
            {"Boost"}
          </Span>
        </Div>
      </Div>
    </Div>
  );
};
