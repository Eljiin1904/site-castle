import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useGame } from "#app/services/blackjack/redux/selectors";
import { Vector } from "#client/comps/vector/Vector";
import { SvgSiteToken } from "#client/svgs/site/SvgSiteToken";
import { Intimal } from "#core/services/intimal";
import "./BlackjackSidebetTotals.scss";

export const BlackjackSidebetTotals = ({}: {}) => {
  const game = useGame();
  const userId = useAppSelector((state) => state.user._id);

  if (!game || !userId) return null;

  const curPlayer = game.players.find((player) => player.userId === userId);
  if (!curPlayer) throw new Error("player not found in game");
  const { sidebetPayouts } = curPlayer;
  if (!sidebetPayouts) throw new Error("Missing sidebetPayouts, should exist");

  return (
    <div className="BlackjackSidebetTotals">
      <table>
        <tbody>
          {sidebetPayouts.map((payout, i) => (
            <tr
              className="sidebet-payout"
              key={payout.title}
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
                  as={SvgSiteToken}
                  size={14}
                />
                <span>{Intimal.toDecimal(payout.amount)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
