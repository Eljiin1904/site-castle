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
}: {
  label?: string | JSX.Element,
  fillColor?: Color,
  strokeColor?: Color,
  values?: {label: string, value: number}[]
}) => {

  const areaHeight = 224;
  const xValues = values.map((item) => item.label);
  const yValues = values.map((item) => item.value);
  const min = Math.min(...yValues);
  const max = Math.max(...yValues);
  const step = (max - min) / 5;

  const yLabels = [min, min + step, min + (step * 2), min + (step * 3), min + (step * 4), max].map((item) => item.toFixed(1));
  
  const xJumpPercent = 100 / (values.length - 1);
  const points = [...values.map((item, index) => {
    const x = index * xJumpPercent;
    const y = item.value * areaHeight / max / 224 * 100;
    return {x, y, label: item.label, value: item.value};
  })];

  return (<Div className="Chart" fx height={320} py={48} pl={64} pr={48} border borderColor="brown-4">        
      {typeof label === "string" ? <AreaLabel label={label} /> : <AreaLabel >{label} </AreaLabel>}
      <Div fx>      
        <YAxis min={min} max={max} labels={yLabels} isToken />
        <XAxis labels={xValues}/>
        <ChartArea fillColor={fillColor} strokeColor={strokeColor} data={points} />
      </Div>
  </Div>);
};