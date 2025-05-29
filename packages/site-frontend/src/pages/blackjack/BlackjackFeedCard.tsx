import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { UserBadge } from "@client/comps/user/UserBadge";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./BlackjackFeedCard.scss";
import config from "#app/config";
import { friendlyBetType } from "@core/services/blackjack/constants/initBetAmounts";
import { BlackjackFeedMasked } from "@core/types/blackjack/BlackjackEventDocument";

export const BlackjackFeedCardPlaceholder = () => {
  return <Placeholder className="BlackjackFeedCardPlaceholder" />;
};

type BlackjackFeedInserted = BlackjackFeedMasked & { inserted?: boolean };

export const BlackjackFeedCard = ({ card }: { card: BlackjackFeedInserted }) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const {
    user: { xp, name },
    type,
    betAmount,
    multiplier,
    payoutAmount,
    playerHandValues,
    dealerHandValues,
  } = card;
  if (!type) return null; // TODO: old schema back-compat, remove
  const won = payoutAmount > 0;
  const displayAmount = payoutAmount > 0 ? payoutAmount : -betAmount;
  const displayType = friendlyBetType(type);
  const imageName = `${type.replace("+", "")}-${won ? "win" : "lose"}.png`;
  const imageSrc = `${config.staticURL}/games/blackjack/sidebets/${imageName}`;

  return (
    <Div
      className={classNames("BlackjackFeedCard", {
        inserted: card.inserted,
        won,
        lost: !won,
      })}
      position="absolute"
      fy
      fx
      column
      align="center"
      px={16}
      py={12}
      bg="gray-6"
      borderBottom
      borderWidth={2}
    >
      <Div
        fx
        center
        gap={4}
        mt={6}
      >
        {xp > 0 && (
          <UserBadge
            xp={xp}
            fontSize={small ? 11 : 12}
          />
        )}
        <Span
          size={small ? 11 : 13}
          weight="medium"
          color={xp == 0 ? "gray" : "white"}
          textOverflow="ellipsis"
        >
          {name}
        </Span>
      </Div>
      <Div
        center
        mt={6}
      >
        <img
          className="BlackjackFeedCard__img"
          src={imageSrc}
          alt="Card"
        />
      </Div>
      <Div
        fx
        center
        gap={4}
        mt={0}
      >
        <Span
          size={small ? 11 : 12}
          weight="medium"
          color={"gray"}
          textOverflow="ellipsis"
        >
          {displayType}
        </Span>
      </Div>
      <Tokens
        value={displayAmount}
        fontSize={small ? 11 : 14}
        mt={6}
      />
      <div className="sep" />
      <Footer
        type={type}
        playerHandValues={playerHandValues}
        dealerHandValues={dealerHandValues}
      />
    </Div>
  );
};

const Footer = ({
  type,
  playerHandValues,
  dealerHandValues,
}: {
  type: BlackjackFeedInserted["type"];
  playerHandValues: number[];
  dealerHandValues: number[];
}) => {
  return (
    <div className="Footer">
      {type !== "main-bet" && <div className="sidebet">Side Bet</div>}

      {type === "main-bet" && playerHandValues && dealerHandValues && (
        <div className="main-bet">
          <div className="hand">
            <div className="top">{playerHandValues.join(" | ")}</div>
            <div className="label">Player</div>
          </div>
          <div className="vs">vs</div>
          <div className="hand">
            <div className="top">{dealerHandValues.join(" | ")}</div>
            <div className="label">Dealer</div>
          </div>
        </div>
      )}
    </div>
  );
};
