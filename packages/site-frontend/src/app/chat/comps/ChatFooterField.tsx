import { useState } from "react";
import { useInterval } from "usehooks-ts";
import { Strings } from "@core/services/strings";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Dialogs } from "@client/services/dialogs";
import { SvgSend } from "@client/svgs/common/SvgSend";
import { Span } from "@client/comps/span/Span";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { Users } from "#app/services/users";
import { ChatInput } from "./ChatInput";

export const ChatFooterField = () => {
  const channel = useAppSelector((x) => x.chat.channel);
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const muteData = useAppSelector((x) => x.user.mute);
  const role = useAppSelector((x) => x.user.role);
  const depositAmount = useAppSelector((x) => x.user.stats.depositAmount || 0);
  const xp = useAppSelector((x) => x.user.xp);
  const generalRequirement = useAppSelector(
    (x) => x.site.settings.chatGeneralRequirement,
  );
  const highrollerRequirement = useAppSelector(
    (x) => x.site.settings.chatHighrollerRequirement,
  );

  const [muted, setMuted] = useState(Users.isMuted(muteData));

  const isAdmin = Users.getPermissions(role).manageChat;
  const level = Users.getLevel(xp);
  const canGeneralChat = isAdmin || depositAmount >= generalRequirement;
  const canHighrollerChat = isAdmin || level >= highrollerRequirement;

  useInterval(() => setMuted(Users.isMuted(muteData)), 1000);

  if (!authenticated) {
    return (
      <Button
        kind="primary"
        size="md"
        fx
        labelSize={14}
        label="Login to Chat"
        onClick={() => Dialogs.open("primary", <LoginModal />)}
      />
    );
  } else if (muted) {
    return (
      <FeedbackCard
        message={
          <Div display="block">
            <Span color="dark-gray">
              {`Muted: ${Strings.kebabToTitle(muteData.reason)} `}
            </Span>
            <Timestamp
              format="timer"
              date={muteData.endDate!}
              ml={6}
            />
          </Div>
        }
      />
    );
  } else if (channel.startsWith("general") && !canGeneralChat) {
    return (
      <FeedbackCard
        message={`You must deposit at least ${generalRequirement} tokens`}
      />
    );
  } else if (channel === "highroller" && !canHighrollerChat) {
    return (
      <FeedbackCard
        message={`You must be at least level ${highrollerRequirement}`}
      />
    );
  } else {
    return <ChatInput />;
  }
};

const FeedbackCard = ({ message }: { message: string | JSX.Element }) => {
  return (
    <Div
      fx
      align="center"
      justify="space-between"
      px={11}
      bg="brown-8"
      border
      cursor="not-allowed"
      style={{ height: "43px" }} // match the TextArea
    >
      {typeof message === "string" ? (
        <Span color="dark-gray">{message}</Span>
      ) : (
        message
      )}
      <Vector
        as={SvgSend}
        size={16}
        color="dark-gray"
      />
    </Div>
  );
};
