import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";

/**
 * Y Axis component for charts.
 * @param min minimum value of the Y axis
 * @param max maximum value of the Y axis
 * @param isToken if true, the Y axis will display token values, if not, it will display string values
 * @param labels array of labels to display on the Y axis. If not provided, the Y axis will be generated with 6 labels.
 * @param borderColor color of the border of the Y axis, default value is 'brown-4'
 * @returns YAxis component to be used in charts
 */
export const YAxis = ({isToken = false, labels, borderColor = 'brown-4', small} : {
  isToken?: boolean
  labels: number[],
  borderColor?: Color,
  small: boolean
}) => {

  return (
    <Div
      fy
      position="absolute"
      bottom={0}
      left={0}      
      borderRight
      borderColor={borderColor}
      pr={small ? 8 : 12}
      style={{transform: "translateX(-100%)"}}
    >
      <Div column wrap justifyContent="space-between" flexShrink={1} style={{height: "calc(100% + 12px)"}}>
        {labels?.map(item  => {
          return (isToken ? <Tokens key={item} value={item} fontSize={small ? 8: 12} color="dark-sand" decimals={ item < 10000000 ? 1: 0} /> : <Span key={item} size={small ? 8: 12} lineHeight={small ? 8: 12} textAlign="right">
            {item}
          </Span> );
        })}
      </Div>
    </Div>
  );
}