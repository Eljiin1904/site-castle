import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { Img } from "@client/comps/img/Img";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgOriginalGames } from "#app/svgs/common/SvgOriginalGames";

export const MessageImage = ({ message }: { message: ChatMessageDocument }) => {
  if (message.agent === "user") {
    const user = message.user;
    return (
      <UserIcon
        avatarIndex={message.user.avatarIndex}
        avatarId={"avatarId" in user ? user.avatarId : undefined}
        width="32px"
      />
    );
  } else if (
    message.kind === "advent-bonus" ||
    message.kind === "case-game-win" ||
    message.kind === "case-battle-win" ||
    message.kind === "double-win" ||
    message.kind === "crash-win" ||
    message.kind === "dice-win" ||
    message.kind === "holiday-case-win" ||
    message.kind === "level-case-win" ||
    message.kind === "gem-case-win" ||
    message.kind === "rain-tip" ||
    message.kind === "limbo-win"
  ) {
    const user = message.user;
    return (
      <UserIcon
        avatarIndex={message.user.avatarIndex}
        avatarId={"avatarId" in user ? user.avatarId : undefined}
        hidden={message.user.hidden}
        width="32px"
      />
    );
  } else if (
    message.kind === "double-streak" ||
    message.kind === "rain-payout"
  ) {
    return (
      <CastleChatLogo />
    );
  } else {
    return (
      // <Img
      //   type="png"
      //   path="/icons/unknown"
      //   width="32px"
      // />
      <CastleChatLogo />
    );
  }
};


const CastleChatLogo = () => {

  return (<Div
    width={32}
    height={32}
    bg="sand"
    borderRadius={`full`}
    flexCenter
    flexShrink
  >
    <Vector
      as={SvgOriginalGames}
      size={16}
      color="dark-brown"
      />
  </Div>);
};

