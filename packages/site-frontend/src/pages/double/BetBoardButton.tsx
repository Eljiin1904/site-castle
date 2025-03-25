import classNames from "classnames";
import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Double } from "#app/services/double";
import { usePostTicket } from "./usePostTicket";
import "./BetBoardButton.scss";
import { Vector } from "@client/comps/vector/Vector";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const BetBoardButton = ({ betKind }: { betKind: DoubleBetKind }) => {
  const userId = useAppSelector((x) => x.user._id);
  const status = useAppSelector((x) => x.double.round.status);
  const processing = useAppSelector((x) => x.double.processing);
  const tickets = useAppSelector((x) => x.double.tickets);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const betPlaced = tickets.some((x) => x.betKind === betKind && x.user.id === userId);
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
          <LaptopDesktopContent
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

const MobileContent = ({ betKind, betPlaced }: { betKind: DoubleBetKind; betPlaced: boolean }) => {
  const svg = Double.getIconFromBetKind(betKind);
  const multiplier = Double.getMultiplierFromBetKind(betKind);
  const {t} = useTranslation(["games.double"]);
  return (
    <Div
      column
      fx
      center
      py={16}
      gap={8}
    >
      <Vector className="icon" as={svg} size={24}/>
      <Span
        className="label"
        weight="semi-bold"
        fontSize={12}
        lineHeight={20}
      >
        {betPlaced ? t("games\\double:betPlaced") : t("games\\double:placeBet")}
      </Span>
      <Div
        grow
        justify="flex-end"
      >
        <Span
          className="label"
          weight="semi-bold"
          fontSize={12}
        >
          {`${multiplier}X`}
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
  const svg = Double.getIconFromBetKind(betKind);
  const multiplier = Double.getMultiplierFromBetKind(betKind);
  const {t} = useTranslation(["games\\double"]);
  return (
    <Div
      fx
      align="center"
      height={40}
      px={16}
      gap={12}
    >
      <Vector className="icon" as={svg} size={16}/>
      <Span
        className="label"
        weight="semi-bold"
        fontSize={16}
      >
        {betPlaced ? t("games\\double:betPlaced") : t("games\\double:placeBet")}
      </Span>
      <Div
        grow
        justify="flex-end"
      >
        <Span
          className="label"
          weight="semi-bold"
          fontSize={16}
        >
          {`${multiplier}X`}
        </Span>
      </Div>
    </Div>
  );
};
