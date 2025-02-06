import classNames from "classnames";
import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Double } from "#app/services/double";
import { usePostTicket } from "./usePostTicket";
import "./BetBoardButton.scss";

export const BetBoardButton = ({ betKind }: { betKind: DoubleBetKind }) => {
  const userId = useAppSelector((x) => x.user._id);
  const status = useAppSelector((x) => x.double.round.status);
  const processing = useAppSelector((x) => x.double.processing);
  const tickets = useAppSelector((x) => x.double.tickets);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const betPlaced = tickets.some(
    (x) => x.betKind === betKind && x.user.id === userId,
  );
  const disabled = betPlaced || processing || status !== "waiting";

  const handlePostTicket = usePostTicket();

  return (
    <button
      className={classNames("BetBoardButton", betKind)}
      disabled={disabled}
      onClick={() => handlePostTicket(betKind)}
    >
      <Conditional
        value={layout}
        mobile={
          <MobileContent
            betKind={betKind}
            betPlaced={betPlaced}
          />
        }
        tablet={
          <TabletContent
            betKind={betKind}
            betPlaced={betPlaced}
          />
        }
        laptop={
          <LaptopDesktopContent
            betKind={betKind}
            betPlaced={betPlaced}
          />
        }
        desktop={
          <LaptopDesktopContent
            betKind={betKind}
            betPlaced={betPlaced}
          />
        }
      />
    </button>
  );
};

const MobileContent = ({
  betKind,
  betPlaced,
}: {
  betKind: DoubleBetKind;
  betPlaced: boolean;
}) => {
  const icon = Double.getIconFromBetKind(betKind);
  const multiplier = Double.getMultiplierFromBetKind(betKind);

  return (
    <Div
      column
      fx
      center
      pt={12}
      pb={8}
      gap={6}
    >
      <Vector
        className="label"
        as={icon}
        size={32}
      />
      <Span
        className="label"
        size={12}
      >
        {betPlaced ? "Bet Placed" : "Place Bet"}
      </Span>
      <Div
        grow
        justify="flex-end"
      >
        <Span
          className="label"
          size={12}
        >
          {`Win ${multiplier}x`}
        </Span>
      </Div>
    </Div>
  );
};

const TabletContent = ({
  betKind,
  betPlaced,
}: {
  betKind: DoubleBetKind;
  betPlaced: boolean;
}) => {
  const icon = Double.getIconFromBetKind(betKind);
  const multiplier = Double.getMultiplierFromBetKind(betKind);

  return (
    <Div
      fx
      align="center"
      height={40}
      px={6}
      gap={6}
    >
      <Vector
        className="label"
        as={icon}
        size={18}
      />
      <Span
        className="label"
        weight="semi-bold"
      >
        {betPlaced ? "Bet Placed" : "Place Bet"}
      </Span>
      <Div
        grow
        justify="flex-end"
      >
        <Span
          className="label"
          weight="semi-bold"
        >
          {`${multiplier}x`}
        </Span>
      </Div>
    </Div>
  );
};

const LaptopDesktopContent = ({
  betKind,
  betPlaced,
}: {
  betKind: DoubleBetKind;
  betPlaced: boolean;
}) => {
  const icon = Double.getIconFromBetKind(betKind);
  const multiplier = Double.getMultiplierFromBetKind(betKind);

  return (
    <Div
      fx
      align="center"
      height={40}
      px={8}
      gap={8}
    >
      <Vector
        className="label"
        as={icon}
        size={20}
      />
      <Span
        className="label"
        weight="semi-bold"
      >
        {betPlaced ? "Bet Placed" : "Place Bet"}
      </Span>
      <Div
        grow
        justify="flex-end"
      >
        <Span
          className="label"
          weight="semi-bold"
        >
          {`Win ${multiplier}x`}
        </Span>
      </Div>
    </Div>
  );
};
