import { Div } from "@client/comps/div/Div";
import { Dot } from "./Dot";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ChartArea = ({ data, fillColor, strokeColor = 'sand'} : {
  data: {x: number, y: number, label: string, value: number}[],
  fillColor?: Color,
  strokeColor?: Color
}) => {

  const startingPoints = data.length > 0 ? `0 0,${ data.map((item) => `${item.x} 0`).join(", ")},100 0` : '';
  const polylinePoints = data.length > 0 ? `0 0,${ data.map((item) => `${item.x} ${item.y}`).join(", ")},100 0` : '';
  
  return (
    <Div
      className="ChartArea"
      color={strokeColor}
      left={0}
      bottom={0}
      position="absolute"
      fy
      ml={24}
      center
      style={{width: "calc(100% - 24px)",transform: "scaleY(-1)"}}
    >
    {data.length === 0 ? <NoDataLabel /> : 
      <svg key={polylinePoints} width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none">
        <PolylineChart initialPoints={startingPoints} endPoints={polylinePoints} fillColor={fillColor} duration={0.3} />
      </svg>}
    {data.map((item, index) => {
          return (
            <Dot color={strokeColor} key={index} label={item.label} value={item.value}  l={item.x} t={item.y}  />
          );
    })}
    </Div>
  );
};

const PolylineChart = ({initialPoints, endPoints, fillColor = 'sand', duration = 0.3}: {
  initialPoints: string,
  endPoints: string,
  fillColor?: Color,
  duration?: number
}) => {
  return (
    <polyline style={{fill: `rgba(var(--${fillColor}-rgb-color),0.1)`}} stroke="currentColor" strokeWidth={0.25}>
      <animate attributeName="points" dur={`${duration}s`} repeatCount="1" fill="freeze" begin="0s"
        from={initialPoints}
        to={endPoints}
      />
    </polyline>
  );  
};

const NoDataLabel = ({}) => {

  const {t} = useTranslation(["account"]);
  return (
    <Span position="absolute" family="title" fontWeight="regular" textAlign="center" color="light-sand" textTransform="uppercase" style={{width: "calc(100% - 24px)",transform: "scaleY(-1)"}}>
      {t("stats.notData")}
    </Span>
  );
};