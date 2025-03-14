import classNames from "classnames";
import { SiteBetDocument } from "@core/types/site/SiteBetDocument";
import { Strings } from "@core/services/strings";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import "./BetCard.scss";

export const BetCardPlaceholder = () => {
  return (
    <Div
      className="BetCardPlaceholder"
      fx
      bg="black-hover"
    />
  );
};

export const BetCard = ({
  bet,
  inserted,
  animate,
}: {
  bet: SiteBetDocument;
  inserted: boolean | undefined;
  animate: boolean;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const { username, xp, hideInfo } = useHiddenInfo(bet.user);

  return (
    <Div
      className={classNames("BetCard", {
        inserted,
        animate,
      })}
      position="absolute"
      fx
      align="center"
      gap={24}
      px={12}
      bg="brown-6"
    >
      <Div
        className="game"
        flexBasis={0}
        grow={3}
        gap={6}
      >
        <Vector
          as={Site.getGameIcon(bet.game)}
          size={20}
          color="yellow"
        />
        <Span
          size={14}
          color="light-gray"
        >
          {Strings.kebabToTitle(bet.game)}
        </Span>
      </Div>
      {["tablet", "laptop", "desktop"].includes(layout) && (
        <Div
          className="player"
          flexBasis={0}
          grow={4}
          gap={6}
        >
          {!hideInfo && <UserBadge xp={xp} />}
          <Span
            size={14}
            color={hideInfo ? "gray" : "light-gray"}
          >
            {username}
          </Span>
        </Div>
      )}
      {["laptop", "desktop"].includes(layout) && (
        <Div
          className="time"
          flexBasis={0}
          grow={2}
        >
          <Span
            size={14}
            color="light-gray"
          >
            {bet.timestamp.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          </Span>
        </Div>
      )}
      {["tablet", "laptop", "desktop"].includes(layout) && (
        <Div
          className="amount"
          flexBasis={0}
          grow={3}
          justify="flex-end"
        >
          <Tokens
            value={bet.betAmount}
            color="gray"
          />
        </Div>
      )}
      {["tablet", "laptop", "desktop"].includes(layout) && (
        <Div
          className="multiplier"
          flexBasis={0}
          grow={3}
          justify="flex-end"
        >
          <Span
            family="title"
            weight="bold"
            size={14}
            color="light-gray"
          >
            {bet.multiplier.toFixed(2)}
            {"x"}
          </Span>
        </Div>
      )}
      <Div
        className="result"
        flexBasis={0}
        grow={3}
        justify="flex-end"
      >
        <Tokens
          value={bet.wonAmount}
          color={bet.wonAmount < bet.betAmount ? "gray" : "green"}
        />
      </Div>
    </Div>
  );
};
