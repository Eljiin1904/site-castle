import { BasicUser } from "@core/types/users/BasicUser";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Span } from "@client/comps/span/Span";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Users } from "#app/services/users";
import { Vector } from "@client/comps/vector/Vector";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserUnblockModal = ({
  user,
  onConfirm,
}: {
  user: BasicUser;
  onConfirm?: () => void;
}) => {
  const level = Users.getLevel(user.xp);
  const {t} = useTranslation();
  const levelIcon = Users.getLevelIcon(level);
  const levelColor = Users.getLevelColor(level);
  
  return (
    <ConfirmModal
      heading="Unblock User"
      confirmLabel="Unblock"
      onConfirm={async () => {
        await Users.setUserBlocked({
          userId: user.id,
          block: false,
        });
        Toasts.success(`${user.name} unblocked.`);
        onConfirm && onConfirm();
      }}
      message={
        <Div
          fx
          align="center"
          pb={24}
          gap={16}
        >
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
                 {t('chat.level',{level:level})}
              </Span>
            </Div>
          </Div>
        </Div>
      }
    />
  );
};
