import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useGame } from "#app/services/blackjack/redux/selectors";
import { Vector } from "@client/comps/vector/Vector";
import { Intimal } from "@core/services/intimal";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";

import "./BlackjackSidebetTotals.scss";
import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Span } from "@client/comps/span/Span";

export const BlackjackSidebetTotals = () => {
  const game = useGame();
  const userId = useAppSelector((state) => state.user._id);
  const sm = useIsMobileLayout();
  if (!game || !userId) return null;

  const curPlayer = game.players.find((player) => player.userId === userId);
  if (!curPlayer) throw new Error("player not found in game");
  const { sidebetPayouts } = curPlayer;
  if (!sidebetPayouts) throw new Error("Missing sidebetPayouts, should exist");

  return (
    <Div
      className="BlackjackSidebetTotals"
      grow
    >
      <table>
        <tbody>
          {sidebetPayouts.map((payout, i) => (
            <Div
              grow
              flow="row"
              bg="black-overlay"
              mt={4}
              p={sm ? 4 : 8}
              borderRadius={4}
              width={sm ? 160 : 200}
              key={payout.title}
              fontSize={sm ? 12 : 16}
              align="center"
              justify="space-between"
            >
              <td className="sidebet-title">
                {payout.title} ({payout.multiplier}x)
              </td>
              <td className="sidebet-amount">
                <Span> + </Span>
                <Vector
                  className="icon"
                  as={SvgDollarSign}
                  size={sm ? 11 : 14}
                />
                <span>{Intimal.toDecimal(payout.amount)}</span>
              </td>
            </Div>
          ))}
        </tbody>
      </table>
    </Div>
  );
};
