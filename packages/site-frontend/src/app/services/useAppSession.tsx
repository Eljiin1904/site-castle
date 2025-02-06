import { Errors } from "@client/services/errors";
import { Dialogs } from "@client/services/dialogs";
import { useAsyncEffect } from "@client/hooks/system/useAsyncEffect";
import { System } from "#app/services/system";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Users } from "#app/services/users";
import { RegionBlockModal } from "#app/modals/system/RegionBlockModal";

export function useAppSession() {
  const dispatch = useAppDispatch();

  useAsyncEffect(
    async () => {
      const { authenticated, user, regionBlocked } =
        await System.startSession();

      dispatch(Users.initUser({ authenticated, user }));

      if (regionBlocked) {
        dispatch(Users.setRestricted());
        Dialogs.open("primary", <RegionBlockModal />);
      }
    },
    [],
    Errors.setAppError,
  );

  return null;
}
