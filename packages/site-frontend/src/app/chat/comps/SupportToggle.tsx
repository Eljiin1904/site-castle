import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useIntercomManager } from "#app/hooks/support/useIntercomManager";
import { SvgQuestionCircle } from "@client/svgs/common/SvgQuestionCircle";

export const SupportToggle = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const processing = useAppSelector((x) => x.support.processing);
  const { handleToggle } = useIntercomManager();

  if (["mobile", "tablet"].includes(layout)) {
    return null;
  }

  return (
    <Div
      bottom={40}
      right={80}
      zIndex={10}
    >
      <Button
        kind="primary-yellow"
        size="lg"
        icon={SvgQuestionCircle}
        iconSize={20}
        loading={processing}
        disabled={processing}
        onClick={handleToggle}
        borderRadius="full"
      />
    </Div>
  );
};
