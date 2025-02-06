import classNames from "classnames";
import { DiceFeedRoll } from "@core/types/dice/DiceRoll";
import { Numbers } from "@core/services/numbers";
import { Strings } from "@core/services/strings";
import { Div } from "@client/comps/div/Div";
import { UserBadge } from "@client/comps/user/UserBadge";
import { Span } from "@client/comps/span/Span";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";
import { SvgChicken } from "@client/svgs/common/SvgChicken";
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
      className={classNames("DiceFeedCard", {
        inserted: roll.inserted,
        won: roll.won,
        lost: !roll.won,
      })}
      position="absolute"
      fy
      fx
      column
      align="center"
      px={16}
      py={12}
      bg="brown-6"
      borderBottom
      borderWidth={2}
    >
      <Div
        align="center"
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
        mt={12}
      >
        <Vector
          as={SvgChicken}
          size={64}
          color={roll.won ? "green" : "brown-4"}
        />
        <Span
          position="absolute"
          color={roll.won ? "black" : "gray"}
          weight="semi-bold"
          size={12}
        >
          {Numbers.round(roll.rollValue / 100, 2).toFixed(2)}
        </Span>
      </Div>
      <Span
        fontSize={13}
        fontWeight="medium"
        color="white"
        textAlign="center"
        mt={12}
      >
        {`${Numbers.floor(roll.multiplier, 2).toFixed(2)}x`}
      </Span>
      <Span
        fontSize={12}
        textAlign="center"
        mt={4}
      >
        {Strings.kebabToTitle(roll.targetKind)}
      </Span>
      <Tokens
        value={roll.won ? roll.wonAmount : 0}
        fontSize={small ? 11 : 14}
        mt={12}
      />
    </Div>
  );
};
