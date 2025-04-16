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
export const YAxis = ({min = 0, max = 5, isToken = false, labels, borderColor = 'brown-4'} : {
  min?: number,
  max?: number,
  isToken?: boolean
  labels: string[],
  borderColor?: Color
}) => {

  let indexes:{value: number, label: string}[] = [];

  if(labels.length > 0) {
    indexes = [{value: 0, label: ""},...labels.map((label, index) => {
      const value = min + ((max - min) / (labels.length - 1)) * index;
      return {value, label};
    })];
  }
  else {

    const step = (max - min) / 5;
    for (let i = 0; i < 6; i++) {
      const value = min + (step * i);
      const label = i == 0 ? "" : value.toFixed(1);
      indexes.push({value, label});
    }
  }
 
  return (
    <Div
      fy
      position="absolute"
      bottom={0}
      left={0}      
      borderRight
      borderColor={borderColor}
      pr={12}
      style={{transform: "translateX(-100%)"}}
    >
      <Div column wrap justifyContent="space-between" flexShrink={1} style={{height: "calc(100% + 12px)"}}>
        {indexes?.reverse().map(item  => {
          return (isToken && item.label.length > 0 ? <Tokens key={item.label} value={item.value} fontSize={12} color="dark-sand" decimals={ item.value < 10000000 ? 1: 0} /> : <Span key={item.label} size={12} lineHeight={12} textAlign="right">
            {item.label}
          </Span> );
        })}
      </Div>
    </Div>
  );
}