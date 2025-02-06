import { Strings } from "@core/services/strings";
import { Chests } from "@core/services/chests";
import { Button } from "@client/comps/button/Button";
import { CardSection } from "@client/comps/cards/CardSection";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { Heading } from "@client/comps/heading/Heading";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const CaseGameHeader = ({
  kindIndex,
  isLoading,
  setKindIndex,
  onRefreshClick,
}: {
  kindIndex: number;
  isLoading: boolean;
  setKindIndex: (x: number) => void;
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
      <Dropdown
        type="select"
        icon={SvgChest}
        collapse={collapse}
        options={Chests.kinds.map((x) => Strings.kebabToTitle(x))}
        value={kindIndex}
        onChange={(x, i) => setKindIndex(i)}
      />
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </CardSection>
  );
};
