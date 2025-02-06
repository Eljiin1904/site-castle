import { useState } from "react";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import { useDelay } from "@client/hooks/system/useDelay";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./BattlePlayerSeat.scss";

export const BattlePlayerSeat = ({
  bot,
  processing,
  onJoinClick,
  onBotClick,
}: {
  bot: boolean;
  processing: boolean | undefined;
  onJoinClick: () => void;
  onBotClick: () => void;
}) => {
  const [disabled, setDisabled] = useState(false);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  const delayEnable = useDelay(() => setDisabled(false), 2000);

  const handleClick = () => {
    if (processing || disabled) {
      return;
    }

    if (bot) {
      onBotClick();
    } else {
      onJoinClick();
    }

    setDisabled(true);
    delayEnable();
  };

  return (
    <Div
      className="BattlePlayerSeat"
      fx
      bg="brown-6"
      cursor={processing || disabled ? "not-allowed" : "pointer"}
      onClick={handleClick}
    >
      <Div
        fx
        align="center"
        column={small}
        p={small ? 12 : 16}
        gap={small ? 8 : 12}
      >
        <Div
          height={small ? 32 : 36}
          width={small ? 32 : 36}
          center
          bg="brown-7"
          border
          borderColor="yellow"
        >
          <Vector
            as={SvgPlus}
            size={12}
            color="yellow"
          />
        </Div>
        <Span
          weight="semi-bold"
          color="white"
          size={small ? 11 : undefined}
        >
          {small
            ? bot
              ? "Add Bot"
              : "Join"
            : bot
              ? "Invite Bot"
              : "Join Battle"}
        </Span>
      </Div>
    </Div>
  );
};
