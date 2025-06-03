import { Button } from "@client/comps/button/Button";
import { CardSection } from "@client/comps/cards/CardSection";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Heading } from "@client/comps/heading/Heading";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const MinesHeader = ({
  isLoading,
  onRefreshClick,
}: {
  isLoading: boolean;
  onRefreshClick: () => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const collapse = layout === "mobile";

  return (
    <CardSection
      position="top"
      justify={collapse ? "space-between" : undefined}
      align="center"
      gap={12}
    >
      <Heading
        as="h2"
        fx
      >
        {"Past Results"}
      </Heading>
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </CardSection>
  );
};
