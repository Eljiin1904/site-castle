import classNames from "classnames";
import { MinesEventDocument } from "#core/types/mines/MinesEventDocument";
import { Numbers } from "#core/services/numbers";
import { Div } from "#client/comps/div/Div";
import { Img } from "#client/comps/img/Img";
import { Placeholder } from "#client/comps/placeholder/Placeholder";
import { Span } from "#client/comps/span/Span";
import { Tokens } from "#client/comps/tokens/Tokens";
import { UserBadge } from "#client/comps/user/UserBadge";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import "./MinesFeedCard.scss";

export const MinesFeedCardPlaceholder = () => {
  return <Placeholder className="MinesFeedCardPlaceholder" />;
};

export const MinesFeedCard = ({ event }: { event: MinesEventDocument }) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const { username, xp, hideInfo } = useHiddenInfo(event.user);

  return (
    <Div
      className={classNames("MinesFeedCard", {
        inserted: event.inserted,
        won: event.won,
        lost: !event.won,
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
        {!hideInfo && (
          <UserBadge
            xp={xp}
            fontSize={small ? 11 : 12}
          />
        )}
        <Span
          size={small ? 11 : 13}
          weight="medium"
          color={hideInfo ? "gray" : "white"}
          textOverflow="ellipsis"
        >
          {username}
        </Span>
      </Div>
      <Div
        center
        mt={6}
      >
        <Img
          type="png"
          path={event.won ? "/icons/mines-gem-group" : "/icons/mines-bomb"}
          width="70px"
          height="70px"
        />
      </Div>
      <Span
        fontSize={12}
        textAlign="center"
        mt={4}
      >
        {event.won ? "Clear" : "Mine"}
      </Span>
      <Span
        fontSize={13}
        fontWeight="medium"
        color="white"
        textAlign="center"
        mt={12}
      >
        {`${Numbers.floor(event.multiplier, 2).toFixed(2)}x`}
      </Span>
      <Tokens
        value={event.won ? event.wonAmount : 0}
        fontSize={small ? 11 : 14}
        mt={12}
      />
    </Div>
  );
};
