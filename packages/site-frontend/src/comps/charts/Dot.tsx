import { Div } from "@client/comps/div/Div";
import { useState } from "react";
/**
 * Dot component. render a dot on the chart with a tooltip to display the label and value of an item
 * in the chart. Dot is not visible until point is hovered. Once it is hovered, it will display the dot and the tooltip.
 * @param r radius of the dot, default value is 5
 * @param t top position of the dot in percentage. radius will be subtracted from the top position to center the dot.
 * @param l left position of the dot in percentage. radius will be subtracted from the left position to center the dot.
 * @param color color of the dot, default value is 'sand'
 * @param label label of the dot, this will be displayed in the tooltip
 * @param value value of the dot, this will be displayed in the tooltip
 * @returns dot component to display in the chart
 */
export const Dot = ({r = 5, t = 0, l = 0, color = 'sand', label, value}: {
  r?: number,
  t?: number,
  l?: number,
  color?: Color,
  label: string,
  value?: number,
}) => {

  // use state to control the visibility of the dot. When hovered the dot will be visible and the tooltip will be displayed.
  // When not hovered, the dot will be hidden and the tooltip will be hidden.
  const [showDot, setShowDot] = useState(false);
  // the dot is 2 times the radius
  const width = r * 2;

  return (
    <Div className="Dot" color={color}  position="absolute" 
    data-tooltip-id ="chart-tooltip"
    data-tooltip-content={label}
    data-chart-value={value}
    data-tooltip-delay-hide={1000}
    onMouseEnter={() => setShowDot(true)}
    onMouseLeave={() => setShowDot(false)}
    style={{
      width:`${width}px`, 
      height: `${width}px`, 
      left: `calc(${l}% - ${r}px)`, 
      top: `calc(${t}% - ${r}px)`,
      cursor: "pointer"}} >
      {showDot && <svg>
        <circle
          fill="currentColor"
          cx={r}
          cy={r}
          r={r}
        />
      </svg>}
    </Div>
  );
};