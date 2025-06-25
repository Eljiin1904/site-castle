import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BasicUser } from "@core/types/users/BasicUser";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Button } from "@client/comps/button/Button";
import { Span } from "@client/comps/span/Span";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Users } from "#app/services/users";
import { UserUnblockModal } from "./UserUnblockModal";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const UserManageBlockModal = () => {
  const {t} = useTranslation(['chat']);
  const query = useQuery({
    queryKey: ["blocked-users"],
    queryFn: () => Users.getBlockedUsers(),
    placeholderData: (prev) => prev,
  });
  const queryClient = useQueryClient();  
  const users = query.data?.users || [];
  const small = useIsMobileLayout();
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading= {t("blockedUsers")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <Div
        fx
        column
        gap={small ? 20: 32}
        px={small ? 20: 32}
        py={small ? 20: 32}
      >
        {users.length === 0 && (
          <Div
          >
            <Span>
              {t("notUserBlocked")}
            </Span>
          </Div>
        )}
        {users.map((x, i) => (
          <UserCard
            key={i}
            index={i}
            user={x}
            onUnblockClick={() => {
              Dialogs.open(
                "secondary",
                <UserUnblockModal
                  user={x}
                  onConfirm={() => {
                    queryClient.invalidateQueries({
                      queryKey: ["blocked-users"],
                    });
                  }}
                />,
              );
            }}
          />
        ))}
      </Div>
    </Modal>
  );
};

const UserCard = ({
  index,
  user,
  onUnblockClick,
}: {
  index: number;
  user: BasicUser;
  onUnblockClick: () => void;
}) => {
  const {t} = useTranslation(['chat']);
  return (
    <Div
      fx
      gap={6}
      align="center"
      justify="space-between"
      borderTop={index % 2 !== 0}
    >
      <Div align="center">
        <UserIcon
          avatarIndex={user.avatarIndex}
          avatarId={user.avatarId}
          width="36px"
        />
        <Span ml={12}>{user.name}</Span>
      </Div>
      <Button
        type="button"
        size="sm"
        kind="primary-yellow"
        label={t("unblock")}
        onClick={onUnblockClick}
      />
    </Div>
  );
};
