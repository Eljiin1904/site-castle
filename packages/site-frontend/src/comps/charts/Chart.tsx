import { Div } from "@client/comps/div/Div";
import classNames from "classnames";
import { AreaLabel } from "./AreaLabel";
import { ChartArea } from "./ChartArea";
import { YAxis } from "./YAxis";
import { XAxis } from "./XAxis";
import './Chart.scss';

/**
 * Chart component, display a chart with a header, values, x and y axis labels<br>
 * @param string - label - The label of the chart, to be display on the top<br>
 * @param string - fillColor - The color to fill the chart area, default is 'sand' opacity 0.2<br>
 * @param string - strokeColor - The color of the chart line, default is 'sand' opacity 1<br>
 * @param array - values - The values to be display on the chart, values is an array of objects with label and value properties<br>
 * the values labels are displayed on the x axis. Y axis is created using the max and min value from the array<br> 
 * @param number - height - The height of the chart, default is 320<br>
 * @param boolean - small - To render the chart for mobile, default is false<br>
 * @returns Chart component
 */
export const Chart = ({
  label,
  values = [],
  fillColor = 'sand',
  strokeColor = 'sand',
  height = 320,
  small = false
}: {
  label?: string | JSX.Element,
  fillColor?: Color,
  strokeColor?: Color,
  values: {label: string, value: number}[],
  height?: Unit,
  size?: Unit,
  small?: boolean,
}) => {

  const xValues = values.map((item) => item.label);
  const yValues = values.map((item) => item.value).filter((item) => typeof item === "number");

  const min =  yValues.length ? Math.min(...yValues) : 0;
  const max =  yValues.length ? Math.max(...yValues) : 0;
  
  const chartHeight = max - min; //Max value - Min value represents the height of the chart;

  //Poinsts to create the chart
  let points: {x:number, y: number, label: string, value: number}[] = [];
  //Y axis labels
  let yLabels: number[] = [];
  //Distance between each point on the x axis in percent
  const xJumpPercent = 100 / (values.length - 1);

  //If there is at least one value that is not a number, we need to set the chart height to 0 and
  //display invalid data message
  let invalidData = false;
  if(yValues.length !== values.length) {
    invalidData = true;
  }
  //If the chart height is 0 and the max value is not 0, it means that all values are the same
  //In this case, we need to set the chart height to 100% and set the yLabels to the max value
  //Points are set to 100% for all values in the y axis
  else if(chartHeight === 0 && max !== 0) {
    
    yLabels = [min];
    points = [...values.map((item, index) => {
      return {x: index * xJumpPercent, y:100, label: item.label, value: item.value};
    })];
  }
  //If the chart height is greater than 0, it means that the values are different
  //In this case, we set a a total of 6 labels on the y axis: min value, max value and 4 values in between
  //Points y axis are set to the percentage of the chart height anx x axis is set to the percentage of the x axis
  else if(chartHeight > 0) {

    const step = (max - min) / 5;
    yLabels = [max,  min + (step * 4),  min + (step * 3) , min + (step * 2) ,min + step , min].map((item) => item);
    
    points = [...values.map((item, index) => {
      const x = index * xJumpPercent;
      const y = (item.value - min) * 100/ chartHeight;
      return {x, y, label: item.label, value: item.value};
    })];
  }
  
  return (<Div className={classNames("Chart",{small})} fx height={height} py={48} pl={small ? 40: 64} pr={small? 24: 48} border borderColor="brown-4">        
      {typeof label === "string" ? <AreaLabel label={label} /> : <AreaLabel >{label} </AreaLabel>}
      <Div fx>      
        <YAxis labels={yLabels} isToken small={small}/>
        <XAxis labels={xValues} left={small ? 0: 24} size={small ? 8: 12}/>
        <ChartArea invalidData={invalidData} fillColor={fillColor} strokeColor={strokeColor} data={points} left={small ? 16: 24} />
      </Div>
  </Div>);
};