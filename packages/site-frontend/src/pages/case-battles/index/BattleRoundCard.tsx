import classNames from "classnames";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./BattleRoundCard.scss";

export const BattleRoundCard = ({
  chest,
  active,
}: {
  chest: ChestDocument;
  active: boolean;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      className={classNames("BattleRoundCard", { active })}
      center
      style={{
        height: small ? "64px" : "84px",
        width: small ? "64px" : "84px",
      }}
    >
      <Img
        className="chest-icon"
        type="png"
        path={`/chests/${chest.imageId}`}
        width={small ? "54px" : "68px"}
      />
    </Div>
  );
};
