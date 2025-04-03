import { useEffect, useState } from "react";
import classNames from "classnames";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgTimesCirlce } from "@client/svgs/common/SvgTimesCircle";
import { Mines } from "#app/services/mines";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./MinesWinCard.scss";

export const MinesWinCard = () => {
  const [hovered, setHovered] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const game = useAppSelector((x) => x.mines.game);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const delay = autoPlaying;

  useEffect(() => setDismissed(false), [game]);

  if (dismissed || !game || !game.completed || !Mines.isAlive(game)) {
    return null;
  }

  const { multiplier, payout } = Mines.getPayout(game);

  return (
    <Div
      className={classNames("MinesWinCard", { delay })}
      position="absolute"
      pointerEvents="none"
      left={0}
      right={0}
      top={0}
      bottom={0}
      center
    >
      <Div
        className="inner-content"
        column
        center
        pb={small ? 16 : 20}
        pt={4}
        bg="gray-8"
        border
        borderColor="gray-4"
        boxShadow={2}
        pointerEvents="all"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: small ? "150px" : "200px",
        }}
      >
        <Img
          type="png"
          path="/icons/mines-gem-group"
          width={small ? "80px" : "120px"}
        />
        <Span
          family="title"
          weight="bold"
          color="white"
          size={small ? 14 : 20}
        >
          {`${Numbers.floor(multiplier, 2).toFixed(2)}x`}
        </Span>
        <Tokens
          value={payout}
          accent="positive"
          mt={8}
        />
        {hovered && (
          <Vector
            as={SvgTimesCirlce}
            position="absolute"
            top={8}
            right={8}
            hover="highlight"
            data-tooltip-id="app-tooltip"
            data-tooltip-content="Dismiss"
            onClick={() => {
              setDismissed(true);
              setHovered(false);
            }}
          />
        )}
      </Div>
    </Div>
  );
};
