import { Div } from "@client/comps/div/Div";
import { BetHeaderColumn } from "#app/comps/bet-board/BetHeaderColumn";

export const DiceFeedHeader = () => {
  return (
    <Div  
      fx
      height={56}
      align="center"
      gap={24}
      py={12}
      borderWidth={1}
      borderColor="brown-4"
      borderTop
      borderBottom
    >
      <BetHeaderColumn header="User" flexBasis={0} grow={4} />
      <BetHeaderColumn header="Time" flexBasis={0} grow={4} hideInMobile={true} />
      <BetHeaderColumn header="Bet Amount" flexBasis={0} grow={4}  hideInMobile={true}/>
      <BetHeaderColumn header="Multiplier" flexBasis={0} grow={3} />
      <BetHeaderColumn header="Payout" flexBasis={0} grow={3} justify={"flex-end"}/>
    </Div>
  );
};
