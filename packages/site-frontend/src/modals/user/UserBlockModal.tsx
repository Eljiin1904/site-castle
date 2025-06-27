import { BasicUser } from "@core/types/users/BasicUser";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Span } from "@client/comps/span/Span";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Vector } from "@client/comps/vector/Vector";
import { UserIcon } from "#app/comps/user-icon/UserIcon";

export const UserBlockModal = ({ user }: { user: BasicUser }) => {
  const level = Users.getLevel(user.xp);
  const {t} = useTranslation(['chat']);
  const levelIcon = Users.getLevelIcon(level);
  const levelColor = Users.getLevelColor(level);
  return (
    <ConfirmModal
      heading={t("blockModal.heading")}
      disableMobileFullscreen={false}
      confirmLabel={t("block")}
      onConfirm={async () => {
        await Users.setUserBlocked({
          userId: user.id,
          block: true,
        });
        Toasts.success("chat:blockModal.confirmSuccess", 5000, {username: user.name});
      }}
      message={
        <Div
        fx
        align="center"
        pb={24}
        gap={16}
        column
      >
        <Span>{t('blockModal.description',{value: {username: user.name}})}</Span>
        <Div gap={16}  align="center">
          <UserIcon
            avatarId={user.avatarId}
            avatarIndex={user.avatarIndex}
            width="80px"
          />
          <Div
            column
            gap={4}
          >
            <Span
              family="title"
              weight="bold"
              size={20}
              color="light-sand"
            >
              {user.name}
            </Span>
            <Div
              align="center"
              mt={2}
            >
              <Vector
                as={levelIcon}
                size={16}
                color={levelColor}
              />
              <Span
                size={12}                
                color={levelColor}
                ml={6}
              >
                {t('level',{level:level})}
              </Span>
            </Div>
          </Div>
        </Div>
      </Div>
      }
    />
  );
};