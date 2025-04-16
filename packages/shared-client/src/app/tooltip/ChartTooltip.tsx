import { Tooltip } from "react-tooltip";
import { Span } from "#client/comps/span/Span";
import { Tokens } from "#client/comps/tokens/Tokens";
import { Div } from "#client/comps/div/Div";
import "./ChartTooltip.scss";

/**
 * Tooltip component for chart, will render a Div comp with a Span for label and Tokens for value
 * use data-chart-value attribute to set the value of the Tokens
 * @returns {JSX.Element}
 */
export const ChartTooltip = () => {
  return <Tooltip id="chart-tooltip" render={({ content, activeAnchor }) => {

    if(!content || activeAnchor?.getAttribute('data-chart-value') === null) {
      return null;
    }
    return (<Div column alignItems="center">
      <Span color="brown-4" size={12}>
      {content}
      </Span>
      <Tokens family="title" value={parseFloat(activeAnchor?.getAttribute('data-chart-value') || '') } fontSize={16} color="brown-4" decimals={1} />
    </Div>);
  }}>
  </Tooltip>;
};
