import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { getTotalBetAmount } from "#core/services/blackjack/utils/getTotalBetAmount";
import { BlackjackBetType } from "#core/types/blackjack/BlackjackBetAmounts";

export function useGame() {
  return useAppSelector((state) => state.blackjack.game);
}
export function useWorld() {
  return useAppSelector((state) => state.blackjack.world);
}

export function useLoading() {
  return useAppSelector((state) => state.blackjack.loading);
}
export function useProcessing() {
  return useAppSelector((state) => state.blackjack.processing);
}

export function usePlayer() {
  const userId = useUserId();
  const game = useGame();
  if (!game) throw new Error("No Game");
  const player = game.players.find((p) => p.userId == userId);
  if (!player) throw new Error("No player by id " + userId);
  return player;
}

export function useTryPlayer() {
  const userId = useUserId();
  const game = useGame();
  if (!userId || !game) return null;
  const player = game.players.find((p) => p.userId == userId);
  if (!player) return null;
  return player;
}
export function useTryDisplayBetAmount(betType: BlackjackBetType) {
  const player = useTryPlayer();
  if (!player) return null;
  return player.displayBetAmounts[betType];
}
export function useBetAmount(betType: BlackjackBetType) {
  return useAppSelector((state) => state.blackjack.betting.betAmounts[betType]);
}

export function useCompleted() {
  const game = useAppSelector((state) => state.blackjack.game);
  if (!game) return false;
  return game.completed;
}

export function usePayoutAmount() {
  const player = usePlayer();
  return player.mainPayout;
}

export function useInit() {
  const checkExisting = useAppSelector((state) => state.blackjack.checkExisting);
  const loading = useAppSelector((state) => state.blackjack.loading);
  return { checkExisting, loading };
}

export function useAllowedActions() {
  const userId = useUserId();
  const nextAction = useAppSelector((state) => state.blackjack.nextAction);
  if (!nextAction) throw new Error("No next action");
  const userNextAction = nextAction.find((na) => na.userId === userId);

  // should never happen in single player
  if (!userNextAction) throw new Error("No user next action");

  return userNextAction.allowedActions;
}

export function useMainBet() {
  const player = usePlayer();
  const userId = useUserId();
  if (!player) throw new Error("useMainBet(): No player by id " + userId);
  const mainBet = player.betAmounts["main-bet"];
  return mainBet;
}

export function useInsurancePending() {
  const game = useGame();
  const userId = useUserId();
  // if (!game) throw new Error("useInsurancePending(): No game");
  if (!game) return null;

  const player = game.players.find((p) => p.userId === userId);
  if (!player) throw new Error("useInsurancePending(): No player by id " + userId);

  return player.insurance === "pending";
}

export function useUserId() {
  return useAppSelector((state) => state.user._id);
}

export function useTotalBetAmount() {
  const betAmounts = useAppSelector((state) => state.blackjack.betting.betAmounts);
  const totalBets = getTotalBetAmount(betAmounts);
  return totalBets;
}
