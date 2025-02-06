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

export const UserManageBlockModal = () => {
  const query = useQuery({
    queryKey: ["blocked-users"],
    queryFn: () => Users.getBlockedUsers(),
    placeholderData: (prev) => prev,
  });
  const queryClient = useQueryClient();

  const users = query.data?.users || [];

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Blocked Users"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <Div
        fx
        column
      >
        {users.length === 0 && (
          <Div
            center
            p={16}
          >
            <Span
              size={14}
              color="dark-gray"
            >
              {"No users blocked."}
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
  return (
    <Div
      fx
      p={16}
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
        kind="primary"
        label="Unblock"
        onClick={onUnblockClick}
      />
    </Div>
  );
};
