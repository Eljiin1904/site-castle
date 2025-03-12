import { RewardBoostTimeframe } from "@core/types/rewards/RewardBoostTimeframe";
import { Strings } from "@core/services/strings";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgClock } from "@client/svgs/common/SvgClock";
import { Rewards } from "#app/services/rewards";

const timeframes = Rewards.boostTimeframes.filter((x) => x !== "daily");

export const BoostsHeader = ({
  isLoading,
  timeframe,
  setTimeframe,
  onCreateClick,
  onRefreshClick,
}: {
  isLoading: boolean;
  timeframe: RewardBoostTimeframe | undefined;
  setTimeframe: (x: RewardBoostTimeframe | undefined) => void;
  onCreateClick: () => void;
  onRefreshClick: () => void;
}) => {
  return (
    <Div
      fx
      gap={12}
    >
      <Div grow />
      <Dropdown
        type="select"
        icon={SvgClock}
        options={["All Timeframes", ...timeframes.map(Strings.kebabToTitle)]}
        value={timeframe ? timeframes.indexOf(timeframe) + 1 : 0}
        onChange={(x, i) =>
          setTimeframe(i === 0 ? undefined : timeframes[i - 1])
        }
      />
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
      <Button
        kind="primary"
        icon={SvgPlus}
        onClick={onCreateClick}
      />
    </Div>
  );
};
