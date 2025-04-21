import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";

/**
 * X Axis component for charts.
 * @param isToken if true, the X axis will display token values, if not, it will display string values
 * @param labels array of labels to display on the X axis. If not provided, the X axis will not display labels.
 * @param borderColor color of the border of the X axis, default value is 'brown-4'
 * @returns YAxis component to be used in charts
 */
export const XAxis = ({isToken = false, labels = [], borderColor = 'brown-4', left} : {
  isToken?: boolean
  labels?: string[]
  borderColor?: Color,
  left: Unit
}) => {
  
  return (
    <Div
      fx
      position="absolute"
      bottom={0}
      left={0}      
      borderTop
      borderColor={borderColor}
      pt={16}
      style={{transform: "translateY(100%)"}}
    >
      <Div fx gap={10} wrap justifyContent="space-between" grow ml={left}>
        {labels?.map(item  => {
          return (isToken && item.length > 0 ? <Tokens key={item} value={parseFloat(item)} fontSize={12} color="dark-sand" decimals={1} /> : <Span key={item} size={12} lineHeight={12} textAlign="center">
            {item}
          </Span>);
        })}
      </Div>
    </Div>
  );
}