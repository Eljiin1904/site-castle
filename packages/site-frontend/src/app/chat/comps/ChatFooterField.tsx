import { Fragment, useState } from "react";
import { useInterval } from "usehooks-ts";
import { Strings } from "@core/services/strings";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { Span } from "@client/comps/span/Span";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { Users } from "#app/services/users";
import { ChatInput } from "./ChatInput";
import { ChatOptionsFooter } from "./ChatOptionsFooter";
import { useTranslation } from "@core/services/internationalization/internationalization";

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
  const {t} = useTranslation();
  const isAdmin = Users.getPermissions(role).manageChat;
  const level = Users.getLevel(xp);
  const canGeneralChat = isAdmin || depositAmount >= generalRequirement;
  const canHighrollerChat = isAdmin || level >= highrollerRequirement;

  useInterval(() => setMuted(Users.isMuted(muteData)), 1000);

  if (!authenticated) {
    return (
      <Button
        kind="primary-yellow"
        size="md"
        fx
        labelSize={14}
        label={t("chat.login")}
        onClick={() => Dialogs.open("primary", <LoginModal />)}
      />
    );
  } else if (muted) {
    return (
      <FeedbackCard
        message={
          <Div display="block">
            <Span color="dark-gray">
              {t('chat.muted',{reason: Strings.kebabToTitle(muteData.reason!)})}
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
    return (<Fragment>
      <FeedbackCard
        message={t(`chat.generalRequirements`, { amount: generalRequirement })}
      />
     <ChatOptionsFooter />
   </Fragment>
    
    );
  } else if (channel === "highroller" && !canHighrollerChat) {
    return (<Fragment>
       <FeedbackCard
        message={t(`chat.highRollerRequirements`, { level: highrollerRequirement })}
      />    
      <ChatOptionsFooter />
    </Fragment>
     );
  } else {
    return <Fragment>
      <ChatInput />
      <ChatOptionsFooter />
    </Fragment>;
  }
};

const FeedbackCard = ({ message }: { message: string | JSX.Element }) => {
  return (
    <ChatInput disabled={true} message={message} />
  );
};
