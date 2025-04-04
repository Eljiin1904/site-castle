import { Div } from "@client/comps/div/Div";
import "./ChatModalBottom.scss";

export const ChatModalBottom = ({ ...forwardProps }) => {
  
  const {children} = forwardProps;
  return (<Div
    className="ChatModalBottom"
    fx
    align="center"
    px={24}
    bg="brown-4"
    {...forwardProps}
  >
    {children}
  </Div>);
}