import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { SiteBetDocument } from "@core/types/site/SiteBetDocument";
import classNames from "classnames";

import { BetColumn } from "./BetColumn";
import { Numbers } from "@core/services/numbers";
import { SiteGame } from "@core/types/site/SiteGame";

export const BetRow = ({ bet, inserted, animate, game='all' }: {
   bet: SiteBetDocument 
   inserted: boolean | undefined;
   animate: boolean;
  game?: SiteGame | 'all';
  }) => {
  
  const small = useIsMobileLayout();

  //Pass userInfo
  const { username, xp, hideInfo } = useHiddenInfo(bet.user);
  
  return (
    <Div
   className={classNames("BetCard", {
      inserted,
      animate,
    })}
    position="relative"
    fx
    align="center"
    gap={24}
    py={12}
    height={56}
    borderWidth={1}
    borderColor="brown-4"
    borderBottom
    >
      {game  === 'all' && <BetColumn flexBasis={0} grow={3}>{bet.game}</BetColumn>}
      <BetColumn flexBasis={0} grow={4}  hideInMobile={true}>{username}</BetColumn>
      <BetColumn flexBasis={0} grow={3} hideInMobile={true} >{bet.timestamp.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })}</BetColumn>
      <BetColumn flexBasis={0} grow={4} hideInMobile={true}> <Tokens value={bet.betAmount} /></BetColumn>
      <BetColumn flexBasis={0} grow={2} >{`${Numbers.floor(bet.multiplier, 2).toFixed(2)} x`} </BetColumn>
      <BetColumn flexBasis={0} grow={3} justify={"flex-end"}>
        {<Tokens
            value={bet.won ? bet.wonAmount : bet.betAmount}
            fontSize={small ? 11 : 14}
            accent={bet.won ? "positive" : 'negative'}
          />}
        </BetColumn>
    </Div>
  );
};