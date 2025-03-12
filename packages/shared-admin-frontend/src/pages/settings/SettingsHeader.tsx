import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { SvgRedo } from "@client/svgs/common/SvgRedo";

export const SettingsHeader = ({
  isLoading,
  onRefreshClick,
}: {
  isLoading: boolean;
  onRefreshClick: () => void;
}) => {
  return (
    <Div
      fx
      gap={12}
    >
      <Div grow />
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </Div>
  );
};
