import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useGame } from "#app/services/blackjack/redux/selectors";
import { Vector } from "@client/comps/vector/Vector";
import { Intimal } from "@core/services/intimal";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";

import "./BlackjackSidebetTotals.scss";
import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const BlackjackSidebetTotals = ({}: {}) => {
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
              p={sm ? 2 : 8}
              borderRadius={4}
              width={sm ? 140 : 200}
              key={payout.title}
              fontSize={sm ? 8 : 16}
            >
              {/* <td className="sidebet-type">{friendlyBetType(payout.type)}:</td> */}
              <td className="sidebet-title">
                {payout.title} ({payout.multiplier}x)
              </td>
              {/* <td className="sidebet-mult">{payout.multiplier}x</td> */}
              <td className="sidebet-amount">
                <span>+</span>
                <Vector
                  className="icon"
                  as={SvgDollarSign}
                  size={sm ? 11 : 14}
                />
                <span>{Intimal.toDecimal(payout.amount)}</span>
              </td>
            </Div>
            // </tr>
          ))}
        </tbody>
      </table>
    </Div>
  );
};
