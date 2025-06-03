import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useEffect, useRef } from "react";
import { Crash } from "#app/services/crash";
import './CrashYAxis.scss';

const SCALE = 2;

export const CrashYAxis = ({multiplier}: {
  multiplier: number,
}) => {
  
  const prevRef = useRef(1.5);
  const currentMultiplier = Math.max(1, multiplier);
  const {labels, proportion} = Crash.getChatLabels(currentMultiplier, prevRef.current);

  useEffect(() => {
    if(labels.length > 4 && labels[4] !== prevRef.current) {
      prevRef.current = labels[4];
    }
    if(currentMultiplier === 1) prevRef.current = 1.5;
  }, [currentMultiplier]);
  
  const minProportionValue = Math.max(.5,proportion);
  const height = Crash.chart.height;

  return (<Div className="CrashYAxis" style={{overflow: 'hidden', height: `${height}px`}}>
    <Div className="CrashMultiplierAxis" column style={{bottom: `0px`,transformOrigin: 'left bottom',transform: `scale(${SCALE*minProportionValue})`,height: `${height}px`}}>
      {labels?.map((item, index)  => <Span style={{transform: `scale(${1/(SCALE*minProportionValue)})`}}  key={index}>
          {item >= 1 ? `${item}X` : ``}
        </Span>)}
    </Div>    
   </Div>);
};