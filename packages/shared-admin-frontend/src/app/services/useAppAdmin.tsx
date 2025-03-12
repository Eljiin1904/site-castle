import { useAsyncEffect } from "@client/hooks/system/useAsyncEffect";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Errors } from "@client/services/errors";
import { Admin } from "#app/services/admin";
import { Security } from "#app/services/security";

export function useAppAdmin() {
  const dispatch = useAppDispatch();

  useAsyncEffect(
    async () => {
      const { authenticated, user } = await Security.authSession();
      dispatch(Admin.initAdmin({ authenticated, user }));
    },
    [],
    Errors.setAppError,
  );

  return null;
}
