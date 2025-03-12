import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { SvgCaretLeft } from "@client/svgs/common/SvgCaretLeft";

export const CreateHeader = ({
  isLoading,
  onCancelClick,
  onCreateClick,
}: {
  isLoading: boolean;
  onCancelClick: () => void;
  onCreateClick: () => void;
}) => {
  return (
    <Div
      fx
      center
      gap={16}
    >
      <Button
        kind="secondary"
        icon={SvgCaretLeft}
        label="Cancel"
        disabled={isLoading}
        onClick={onCancelClick}
      />
      <Div grow />
      <Button
        kind="primary"
        disabled={isLoading}
        label="Create Holiday"
        onClick={onCreateClick}
      />
    </Div>
  );
};
