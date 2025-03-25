import { BetColumn } from "#app/comps/bet-board/BetColumn";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Numbers } from "@core/services/numbers";
import { DoubleTicketDocument } from "@core/types/double/DoubleTicketDocument";
import classNames from "classnames";


export const DoubleFeedRow = ({ roll }: {
  roll: DoubleTicketDocument
  }) => {
  
  //Pass userInfo
  const { username, xp, hideInfo } = useHiddenInfo(roll.user);
  const avatarIndex = useAppSelector((x) => x.user.avatarIndex);
  const avatarId = useAppSelector((x) => x.user.avatarId);
  
  return (
    <Div
   className={classNames("BetCard")}
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
      <BetColumn flexBasis={0} grow={4} > <Div flexCenter gap={12} center>
       <UserIcon
                   avatarIndex={avatarIndex}
                   avatarId={avatarId}
                   width={"24px"}
                 />
      <Span color="light-sand">{username}</Span>
      </Div></BetColumn>
      <BetColumn flexBasis={0} grow={4} hideInMobile={true}>{ roll?.timestamp?.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })}</BetColumn>
      <BetColumn flexBasis={0} grow={4} hideInMobile={true} >{roll.betAmount}</BetColumn>
      <BetColumn flexBasis={0} grow={3}> </BetColumn>
      <BetColumn flexBasis={0} grow={3} justify={"flex-end"}>
        {/* <Tokens
          value={roll.value ? roll.roll.value : 0}
          accent={roll.roll.value ? "positive" : undefined}
        /> */}
        {`missing details`}
      </BetColumn>
    </Div>
  );
};