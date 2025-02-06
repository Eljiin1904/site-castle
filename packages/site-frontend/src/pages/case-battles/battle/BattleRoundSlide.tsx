import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Dialogs } from "@client/services/dialogs";
import { CasePickerInspector } from "#app/modals/case-picker/CasePickerInspector";
import "./BattleRoundSlide.scss";

export const BattleRoundSlide = ({
  chest,
  index,
}: {
  chest: ChestDocument;
  index: number;
}) => {
  return (
    <Div
      className={classNames("BattleRoundSlide", {
        [`index-${index}`]: index !== undefined,
      })}
      position="absolute"
      align="center"
      hover="none"
      onClick={() =>
        Dialogs.open("secondary", <CasePickerInspector chest={chest} />)
      }
      data-tooltip-id="app-tooltip"
      data-tooltip-content={chest.displayName}
    >
      <Img
        type="png"
        path={`/chests/${chest.imageId}`}
        width="40px"
      />
    </Div>
  );
};
