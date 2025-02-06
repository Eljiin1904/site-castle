import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Users } from "#app/services/users";

export function useAppUser() {
  const dispatch = useAppDispatch();

  useSocketListener("user-update", (x) => {
    dispatch(Users.updateUser(x));
  });

  return null;
}
