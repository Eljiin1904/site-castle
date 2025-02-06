import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Card } from "@client/comps/cards/Card";
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
import { Users } from "#app/services/users";

export const UserCard = () => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const small = mainLayout === "mobile";
  const username = useAppSelector((x) => x.user.username);
  const avatarIndex = useAppSelector((x) => x.user.avatarIndex);
  const avatarId = useAppSelector((x) => x.user.avatarId);
  const registerDate = useAppSelector((x) => x.user.registerDate);
  const { level, levelProgress, levelGoal } = useUserLevel();

  return (
    <Card p={16}>
      <Div
        hover="highlight"
        onClick={() => Dialogs.open("primary", <UserAvatarEditModal />)}
      >
        <UserIcon
          avatarIndex={avatarIndex}
          avatarId={avatarId}
          width={small ? "68px" : "80px"}
        />
        <Div
          position="absolute"
          bottom={0}
          left={0}
          bg="yellow"
          p={small ? 4 : 6}
        >
          <Vector
            as={SvgEdit}
            color="black"
            size={small ? 10 : 12}
          />
        </Div>
      </Div>
      <Div
        column
        fx
        ml={20}
      >
        <Div align="center">
          <Span
            family="title"
            weight="semi-bold"
            size={small ? 16 : 20}
            color="white"
          >
            {username}
          </Span>
          <Div
            grow
            justify="flex-end"
          >
            {!small && (
              <Span
                weight="semi-bold"
                size={small ? 10 : 12}
              >
                {"Joined:"}
              </Span>
            )}
            <Span
              weight="semi-bold"
              size={small ? 10 : 12}
              ml={4}
              color="white"
            >
              {registerDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Span>
          </Div>
        </Div>
        <ProgressBar
          height={8}
          progress={levelProgress / levelGoal}
          my={small ? 10 : 12}
        />
        <Div
          fx
          align="center"
        >
          <Div align="center">
            <Img
              type="png"
              path={Users.getLevelBadge(level)}
              width="20px"
            />
            <Span
              size={12}
              weight="medium"
              ml={6}
            >
              {small ? level : `Level ${level}`}
            </Span>
          </Div>
          <Span
            flexGrow
            textAlign="right"
            family="title"
            weight="bold"
            size={small ? 10 : 12}
          >
            {`${Intimal.toLocaleString(levelProgress, 0)} / ${Intimal.toLocaleString(levelGoal, 0)} XP`}
          </Span>
        </Div>
      </Div>
    </Card>
  );
};
