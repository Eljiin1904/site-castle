import classNames from "classnames";
import { DiceFeedRoll } from "@core/types/dice/DiceRoll";
import { Numbers } from "@core/services/numbers";
import { Strings } from "@core/services/strings";
import { Div } from "@client/comps/div/Div";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Span } from "@client/comps/span/Span";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import "./DiceFeedCard.scss";

export const DiceFeedCardPlaceholder = () => {
  return <Placeholder className="DiceFeedCardPlaceholder" />;
};

export const DiceFeedCard = ({ roll }: { roll: DiceFeedRoll }) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const { username, xp, hideInfo } = useHiddenInfo(roll.user);

  return (
    <Div
    className={classNames("BetCard")}
    position="relative"
    fx
    align="center"
    gap={24}
    py={12}
    height={56}
    borderWidth={1}
    borderColor="brown-4"
    borderBottom
    >
      <Div
        flexBasis={0}
        grow={4}
        gap={4}
      >
        {!hideInfo && (
          <UserBadge
            xp={xp}
            fontSize={small ? 11 : 12}
          />
        )}
        <Span
          size={small ? 11 : 14}
          weight="medium"
          color={hideInfo ? "gray" : "light-sand"}
          textOverflow="ellipsis"
        >
          {username}
        </Span>
      </Div>

      {["tablet", "laptop", "desktop"].includes(layout) && (
        <Div
          className="time"
          flexBasis={0}
          grow={4}
        >
           {roll.inserted}
        </Div>
      )}      
      {["laptop", "desktop"].includes(layout) && (
        <Div
          className="amount"
          flexBasis={0}
          grow={4}
        >
          <Span
            weight="medium"
            size={small ? 11 : 14}
            color="white"
            textTransform="uppercase"
          >
             <Tokens
                value={roll.betAmount ? roll.wonAmount : 0}
                fontSize={small ? 11 : 14}
              />
          </Span>
        </Div>
      )}
      <Div
          className="multiplier"
          flexBasis={0}
          grow={2}
        >
          <Span
            weight="medium"
            size={small ? 11 : 14}
            color="white"
          >
            {`${Numbers.floor(roll.multiplier, 2).toFixed(2)} x`}
          </Span>
      </Div>
      <Div
        className="result"
        flexBasis={0}
        grow={3}
        justify="flex-end"
      >
        <Span
          weight="medium"
          size={12}
          color={!roll.won ? "green" : "brown-4"}
          textTransform="uppercase"
        >
         <Tokens
        value={roll.won ? roll.wonAmount : 0}
        fontSize={small ? 11 : 14}
        accent={roll.won ? "positive" : undefined}
      />
        </Span>
      </Div>
    </Div>
  );
};