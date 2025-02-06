import { BasicUser } from "@core/types/users/BasicUser";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Span } from "@client/comps/span/Span";
import { Img } from "@client/comps/img/Img";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Users } from "#app/services/users";

export const UserBlockModal = ({ user }: { user: BasicUser }) => {
  const level = Users.getLevel(user.xp);

  return (
    <ConfirmModal
      heading="Block User"
      confirmLabel="Block"
      onConfirm={async () => {
        await Users.setUserBlocked({
          userId: user.id,
          block: true,
        });
        Toasts.success(`${user.name} blocked.`);
      }}
      message={
        <Div
          fx
          align="center"
          pb={24}
          gap={16}
          borderBottom
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
              color="white"
            >
              {user.name}
            </Span>
            <Div
              align="center"
              mt={2}
            >
              <Img
                type="png"
                path={Users.getLevelBadge(level)}
                width="20px"
              />
              <Span
                size={12}
                weight="medium"
                color="gray"
                ml={6}
              >
                {`Level ${level}`}
              </Span>
            </Div>
          </Div>
        </Div>
      }
    />
  );
};
