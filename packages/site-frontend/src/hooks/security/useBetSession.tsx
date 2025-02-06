import { isPast } from "date-fns";
import { useEventCallback } from "usehooks-ts";
import { Users } from "#app/services/users";
import { useAppSelector } from "../store/useAppSelector";
import { useAppDispatch } from "../store/useAppDispatch";

export function useBetSession() {
  const session = useAppSelector((x) => x.user.betSession);
  const dispatch = useAppDispatch();

  const getToken = useEventCallback(() => {
    if (!session) {
      return undefined;
    }

    if (isPast(session.expires)) {
      return undefined;
    }

    return session.token;
  });

  const setToken = useEventCallback((token: string) => {
    dispatch(Users.setBetToken(token));
  });

  return { getToken, setToken };
}
