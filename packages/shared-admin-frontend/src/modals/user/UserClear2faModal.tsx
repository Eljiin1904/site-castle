import { useQueryClient } from "@tanstack/react-query";
import { UserDocument } from "@core/types/users/UserDocument";
import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Toasts } from "@client/services/toasts";
import { Users } from "#app/services/users";

export const UserClear2faModal = ({ user }: { user: UserDocument }) => {
  const queryClient = useQueryClient();

  return (
    <ConfirmModal
      heading="Disable Authenticator"
      message="Are you sure you want to disable the user's authenticator?"
      onConfirm={async () => {
        await Users.disableAuthenticator({ userId: user._id });

        Toasts.success("User authenticator disabled.");

        queryClient.invalidateQueries({
          queryKey: ["user", user._id],
        });
      }}
    />
  );
};
