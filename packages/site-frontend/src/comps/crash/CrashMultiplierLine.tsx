import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { CrashRoundStatus } from "@core/types/crash/CrashRoundStatus";
import { Span } from "@client/comps/span/Span";
import classNames from "classnames";
import './CrashMultiplierLine.scss';
import { Crash } from "#app/services/crash";

export const CrashMultiplierLine = ({status, position, cashout = 1}: {
  position: number;
  status: CrashRoundStatus,
  cashout?: number;
}) => {
 
  return (
    <Div className={classNames("CrashMultiplierLine", status, { crashed: cashout > 1})} center zIndex={11} left={4} style={{ bottom: `${Crash.chart.offset +position}px`}} width={'full'}  height={1} borderTop position="absolute">
      <Vector style={{transform: 'rotate(90deg)'}} as={SvgArrowRight } size={16} position="absolute"  />
      {cashout > 1 && <Span size={10} color="bright-green">{cashout}X</Span>}
    </Div>
  );
};