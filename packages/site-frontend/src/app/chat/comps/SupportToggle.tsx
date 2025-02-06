import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { SvgHeadset } from "@client/svgs/common/SvgHeadset";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useIntercomManager } from "#app/hooks/support/useIntercomManager";

export const SupportToggle = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const processing = useAppSelector((x) => x.support.processing);
  const { handleToggle } = useIntercomManager();

  if (["mobile", "tablet"].includes(layout)) {
    return null;
  }

  return (
    <Div
      bottom={20}
      right={64}
      boxShadow={3}
    >
      <Button
        kind="secondary"
        size="lg"
        icon={SvgHeadset}
        iconSize={20}
        loading={processing}
        disabled={processing}
        onClick={handleToggle}
      />
    </Div>
  );
};
