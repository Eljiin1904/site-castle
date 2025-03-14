import { BetHeaderColumn } from "#app/comps/bet-board/BetHeaderColumn";
import { Div } from "@client/comps/div/Div";

export const ReferralHeaderHistory = () => {

  return (<Div
        className="BetHeader"
        height={56}
        align="center"
        gap={24}
        py={12}
        borderWidth={1}
        borderColor="brown-4"
        borderTop
        borderBottom
      >
        <BetHeaderColumn header="User" flexBasis={0} grow={3}/>
        <BetHeaderColumn header="Time" flexBasis={0} grow={3} hideInMobile={true} />
        <BetHeaderColumn header="Earnings" flexBasis={0} grow={2} />
        <BetHeaderColumn header="Status" flexBasis={0} grow={2} justify={"flex-end"}/>
      </Div>);
};