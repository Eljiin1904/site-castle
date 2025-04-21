import {Fragment} from "react";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { ProgressBar } from "@client/comps/progress-bar/ProgressBar";
import { Span } from "@client/comps/span/Span";
import { Dialogs } from "@client/services/dialogs";
import { SvgEdit } from "@client/svgs/common/SvgEdit";
import { Vector } from "@client/comps/vector/Vector";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useUserLevel } from "#app/hooks/users/useUserLevel";
import { UserAvatarEditModal } from "#app/modals/user/UserAvatarEditModal";
import { Intimal } from "@core/services/intimal";
import { Users } from "@client/services/users";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import './UserCard.scss';

export const UserCard = () => {
  
  const {t} = useTranslation(["account","fields"]);
  const username = useAppSelector((x) => x.user.username);
  const email = useAppSelector((x) => x.user.email);
  
  const registerDate = useAppSelector((x) => x.user.registerDate);  

  return (<Div fx column>
    <Div fx gap={40}>
      <UserAvatar />
      <Div
        column
        fx
      >
        <UserCardData label={t("fields:username")} data={username} />
        <UserCardData label={t("fields:email")} data={email} />
        <UserCardData label={t("fields:date.joined")} border={false} data={registerDate?.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })} />        
      </Div>
    </Div>
    <UserCardLevel />
    </Div>
  );
};

const UserAvatar = () => {

  const avatarIndex = useAppSelector((x) => x.user.avatarIndex);
  const avatarId = useAppSelector((x) => x.user.avatarId);
  const small = useIsMobileLayout();

  return (<Div
  className="UserCard"
    hover="highlight"
    onClick={() => Dialogs.open("primary", <UserAvatarEditModal />)}
    style={{width: small ? "68px" : "131px", height: small ? "68px" : "131px"}}
  >
    <UserIcon
      avatarIndex={avatarIndex}
      avatarId={avatarId}
      width={small ? "68px" : "131px"}
    />
    <Div
      className="EditAvatar"
      position="absolute"
      top={0}
      right={0}
      p={small ? 4 : 8}
    >
      <Vector
        as={SvgEdit}
        color="light-sand"
        size={small ? 10 : 16}
      />
    </Div>
  </Div>)
};

const UserCardData = ({label, data, border = true}:
{
label: string;
data: string | number;
border?: boolean;
}) => {

  return (<Div 
    fx 
    justifyContent="space-between"
    borderBottom={border}
    borderColor="brown-4"
    py={16}
  >
    <Span>
      {label}
    </Span>
    <Span
      size={16}
      lineHeight={24}
      family="title"
      weight="regular"
      color="light-sand"
      textTransform="uppercase"
    >
      {data}
    </Span>
  </Div>);
};

const UserCardLevel = () => {
  const { level, levelProgress, levelGoal } = useUserLevel();
  const {t} = useTranslation(["account"]);
  return(<Div fx borderTop borderColor="brown-4" pt={16} column gap={16}>
    <Div fx justifyContent="space-between">
      <Span>{t("progress")}</Span>
      <Div>
        <Span 
        color="light-sand"
        >
          {`${Intimal.toLocaleString(levelProgress, 0)}`}
        </Span>
        <Span>
          {`/ ${Intimal.toLocaleString(levelGoal, 0)} XP`}
        </Span>
      </Div>
    </Div>
    <ProgressBar height={8}  progress={levelProgress / levelGoal} />
    <Div fx justifyContent="space-between">
      <Div gap={4}>
        <Img
          type="png"
          path={Users.getLevelBadge(level)}
          width="20px"
        />
        <Span>{level}</Span>
      </Div>
      <Div gap={4}>
        <Span>{level+1}</Span>
        <Img
          type="png"
          path={Users.getLevelBadge(level+1)}
          width="20px"
        />       
      </Div>
    </Div>
  </Div>);
};
