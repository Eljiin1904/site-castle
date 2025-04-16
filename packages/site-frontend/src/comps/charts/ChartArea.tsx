import { Div } from "@client/comps/div/Div";
import { Dot } from "./Dot";

export const ChartArea = ({ data, fillColor, strokeColor = 'sand'} : {
  data: {x: number, y: number, label: string, value: number}[],
  fillColor?: Color,
  strokeColor?: Color
}) => {

  const polylinePoints = data.length > 0 ? `0 0,${ data.map((item) => `${item.x} ${item.y}`).join(", ")},100 0` : '0 0,100 0';
  return (
    <Div
      className="ChartArea"
      color={strokeColor}
      left={0}
      bottom={0}
      position="absolute"
      fy
      ml={24}
      style={{width: "calc(100% - 24px)",transform: "scaleY(-1)"}}
    >
      <svg width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points={polylinePoints} style={{fill:`rgba(var(--${fillColor}-rgb-color),0.1)`}} />
        {data.map((item, index) => {
          if(index >= data.length - 1) {
            return null;
          }
          return (
            <line key={`${item.label}`} x1={item.x} y1={item.y} x2={data[index + 1].x} y2={data[index + 1].y} stroke="currentColor" strokeWidth={0.35}/>
          );
        })}
      </svg>
      {data.map((item, index) => {
          return (
            <Dot color={strokeColor} key={index} label={item.label} value={item.value}  l={item.x} t={item.y}  />
          );
        })}
    </Div>
  );
};