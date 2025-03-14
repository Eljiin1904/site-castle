import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import "./HistoryOverlay.scss";

export const HistoryOverlay = () => {

  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (<Div position="absolute" fx bottom={0} height={small ? 40: 80} className="HistoryOverlay"></Div>)
};