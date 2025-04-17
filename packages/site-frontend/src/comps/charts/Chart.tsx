import { Div } from "@client/comps/div/Div";
import { AreaLabel } from "./AreaLabel";
import { ChartArea } from "./ChartArea";
import { YAxis } from "./YAxis";
import { XAxis } from "./XAxis";

export const Chart = ({
  label,
  values = [],
  fillColor = 'sand',
  strokeColor = 'sand',
  height = 320,
}: {
  label?: string | JSX.Element,
  fillColor?: Color,
  strokeColor?: Color,
  values: {label: string, value: number}[],
  height?: Unit,
}) => {

  const areaHeight = height - 96;
  const xValues = values.map((item) => item.label);
  const yValues = values.map((item) => item.value);

  const min =  yValues.length ? Math.min(...yValues) : 0;
  const max =  yValues.length ? Math.max(...yValues) : 0;
  const step = (max - min) / 5;

  const chartHeight = max - min; //Max value - Min value represents the height of the chart
  
  const yLabels = max > min  ? [min, min + step, min + (step * 2), min + (step * 3), min + (step * 4), max].map((item) => item): (
    max == min ? [min] : []
  )
  const xJumpPercent = 100 / (values.length - 1);
  const points =  max >= min ? [...values.map((item, index) => {
    const x = index * xJumpPercent;
    const y = (item.value - min) * 100/ chartHeight;
    //const y =  10;//item.value === 0 ? item.value : item.value * areaHeight / max / 224 * 100;
    return {x, y, label: item.label, value: item.value};
  })]: [];

  return (<Div className="Chart" fx height={height} py={48} pl={64} pr={48} border borderColor="brown-4">        
      {typeof label === "string" ? <AreaLabel label={label} /> : <AreaLabel >{label} </AreaLabel>}
      <Div fx>      
        <YAxis labels={yLabels.reverse()} isToken />
        <XAxis labels={xValues}/>
        <ChartArea fillColor={fillColor} strokeColor={strokeColor} data={points} />
      </Div>
  </Div>);
};