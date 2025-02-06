import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Img } from "@client/comps/img/Img";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./BattleReelDivider.scss";

export const BattleReelDivider = ({ seat }: { seat: number }) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const mode = useAppSelector((x) => x.battlePlayer.mode);
  const small = layout === "mobile";

  const getKind = () => {
    if (mode === "1v1" || mode === "3-way" || mode === "4-way") {
      return "vs";
    } else if (mode === "2v2") {
      return seat === 1 ? "t1" : seat === 2 ? "vs" : "t2";
    } else if (mode === "2p" || mode === "3p" || mode === "4p") {
      return "t1";
    }
    return "vs";
  };

  const kind = getKind();

  return (
    <Div
      className="BattleReelDivider"
      center
      zIndex={1}
    >
      <Div
        className="bg"
        position="absolute"
        bg="brown-5"
        border
        borderColor="brown-8"
        borderWidth={2}
      />
      {kind === "vs" ? (
        <Span
          family="title"
          weight="semi-bold"
          size={small ? 8 : 10}
        >
          {"VS"}
        </Span>
      ) : (
        <Img
          path={kind === "t1" ? "/icons/team-icon-1" : "/icons/team-icon-2"}
          type="png"
          width={small ? "12px" : "16px"}
        />
      )}
    </Div>
  );
};
