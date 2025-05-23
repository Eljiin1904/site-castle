import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { LoginModal } from "#app/modals/login/LoginModal";
import { getExistingRequested, setGame } from "../Blackjack";
import requestExistingGame from "../api/requestExistingGame";

export function useGetExistingGame() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  // const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const dispatch = useAppDispatch();

  const handleGetExisting = usePost(
    async (isMounted) => {
      if (!authenticated) {
        return Dialogs.open("primary", <LoginModal />);
      }

      if (!isMounted()) {
        return;
      }

      dispatch(getExistingRequested());

      const resp = await requestExistingGame();

      dispatch(setGame(resp));
    },
    // (x) => dispatch(setProcessing(x)),
  );

  return handleGetExisting;
}
