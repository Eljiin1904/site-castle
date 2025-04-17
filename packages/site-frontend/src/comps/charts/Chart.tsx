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

  const xValues = values.map((item) => item.label);
  const yValues = values.map((item) => item.value);

  const min =  yValues.length ? Math.min(...yValues) : 0;
  const max =  yValues.length ? Math.max(...yValues) : 0;
  
  const chartHeight = max - min; //Max value - Min value represents the height of the chart;

  let points: {x:number, y: number, label: string, value: number}[] = [];
  let yLabels: number[] = [];
  const xJumpPercent = 100 / (values.length - 1);
  if(chartHeight > 0 || max !== 0 ) {

    const step = (max - min) / 5;
    yLabels = [max,  min + (step * 4),  min + (step * 3) , min + (step * 2) ,min + step , min].map((item) => item);
    
    points = [...values.map((item, index) => {
      const x = index * xJumpPercent;
      const y = (item.value - min) * 100/ chartHeight;
      return {x, y, label: item.label, value: item.value};
    })];
  }
  
  return (<Div className="Chart" fx height={height} py={48} pl={64} pr={48} border borderColor="brown-4">        
      {typeof label === "string" ? <AreaLabel label={label} /> : <AreaLabel >{label} </AreaLabel>}
      <Div fx>      
        <YAxis labels={yLabels} isToken />
        <XAxis labels={xValues}/>
        <ChartArea fillColor={fillColor} strokeColor={strokeColor} data={points} />
      </Div>
  </Div>);
};