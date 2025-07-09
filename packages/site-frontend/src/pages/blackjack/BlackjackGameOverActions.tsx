import "./BlackjackGameOverActions.scss";
import { Div } from "@client/comps/div/Div";
import { BlackjackInputGroup } from "./BlackjackInputGroup";

export default function BlackjackGameOverActions() {

  return (
    <Div
      className="BlackjackGameOverActions"
      justify="center"
    >
      <BlackjackInputGroup />
    </Div>
  );
}
