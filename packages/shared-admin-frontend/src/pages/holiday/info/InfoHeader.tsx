import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { SvgCaretLeft } from "@client/svgs/common/SvgCaretLeft";
import { SvgRedo } from "@client/svgs/common/SvgRedo";

export const InfoHeader = ({
  isLoading,
  onRefreshClick,
}: {
  isLoading: boolean;
  onRefreshClick: () => void;
}) => {
  return (
    <Div
      fx
      center
      gap={16}
    >
      <Link
        type="router"
        to="/holidays"
        hover="none"
      >
        <Button
          kind="secondary"
          icon={SvgCaretLeft}
          label="Back"
        />
      </Link>
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
