import { addMilliseconds } from "date-fns";
import { Numbers } from "@core/services/numbers";
import { Dates } from "@core/services/dates";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgTicket } from "@client/svgs/common/SvgTicket";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const RaffleHeader = ({
  setRaffleIndex,
  raffleIndex,
}: {
  raffleIndex: number;
  setRaffleIndex: (x: number) => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const raffles = useAppSelector((x) => x.holiday.raffles);
  const { local } = raffles[raffleIndex];

  return (
    <Div
      height={40}
      gap={8}
    >
      {!small && (
        <PageTitle
          heading="Raffle"
          icon={SvgTicket}
        />
      )}
      <Dropdown
        type="select"
        options={raffles.map((x) =>
          Dates.toTimestamp(addMilliseconds(x.endDate, 1), { hour12: true }),
        )}
        value={raffleIndex}
        onChange={(x, i) => setRaffleIndex(i)}
        fx={small}
        style={{ minWidth: "208px" }}
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
        <Vector
          as={SvgTicket}
          color="light-blue"
          size={14}
        />
        <Span
          family="title"
          weight="bold"
          color="white"
        >
          {Numbers.toLocaleString(local?.ticketCount || 0, 0)}
        </Span>
        <Vector
          as={SvgInfoCircle}
          hover="highlight"
          data-tooltip-id="app-tooltip"
          data-tooltip-content="Every 1 Snowball spent = 1 Ticket"
        />
      </Div>
    </Div>
  );
};
