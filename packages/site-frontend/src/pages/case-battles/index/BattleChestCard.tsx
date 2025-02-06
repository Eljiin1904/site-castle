import { ChestWithCount } from "@core/types/chests/ChestDocument";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Img } from "@client/comps/img/Img";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const BattleChestCard = ({ chest }: { chest: ChestWithCount }) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      data-tooltip-id="app-tooltip"
      data-tooltip-content={chest.displayName}
    >
      <Img
        type="png"
        path={`/chests/${chest.imageId}`}
        width={small ? "64px" : "84px"}
      />
      <Div
        position="absolute"
        bottom={0}
        right={0}
        px={4}
        py={1}
        center
        bg="brown-8"
        border
      >
        <Span
          family="title"
          weight="bold"
          size={12}
          color="white"
        >
          {chest.count}
          {"x"}
        </Span>
      </Div>
    </Div>
  );
};
