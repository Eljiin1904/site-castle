import { useEffect, useState } from "react";
import classNames from "classnames";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Span } from "@client/comps/span/Span";
import { Mines } from "#app/services/mines";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import "./MinesWinCard.scss";

export const MinesWinCard = () => {
  const [dismissed, setDismissed] = useState(false);
  const {t} = useTranslation(["games\\mines"]);
  const game = useAppSelector((x) => x.mines.game);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const small = useIsMobileLayout();
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
        p={24}
        gap={8}
        bg="dark-brown"
        border
        borderColor="bright-green"
        borderWidth={2}
        pointerEvents="all"
        style={{
          minWidth: "150px"
        }}
      >
        <Span
          color="light-sand"
          size={16}
          textTransform="uppercase"
          fontFamily="title"
          weight="regular"
          lineHeight={24}
        >
          {t("winModal.title")}
        </Span>
        <Tokens
          value={payout}
          accent="positive"
          fontSize={48}
          color="bright-green"
          family="title"
          weight="regular"
        />
        <Div fx gap={8} center borderTop borderColor="dark-brown-active" pt={16} mt={16}>
          <Span
            family="title"
            weight="regular"
            color="light-sand"
            textTransform="uppercase"
            size={small ? 14 : 16}
          >
            {t('winModal.multiplier')}
          </Span>
          <Span
            family="title"
            weight="regular"
            color="bright-green"
            size={small ? 14 : 16}
          >
            {`${Numbers.floor(multiplier, 2).toFixed(2)}X`}
          </Span>
        </Div>
        
      </Div>
    </Div>
  );
};
