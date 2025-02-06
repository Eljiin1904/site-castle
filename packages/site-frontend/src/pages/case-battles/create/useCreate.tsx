import { useNavigate } from "react-router-dom";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { CaseBattles } from "#app/services/case-battles";
import { Gtm } from "#app/services/gtm";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

export function useCreate() {
  const chests = useAppSelector((x) => x.battleCreate.chests);
  const mode = useAppSelector((x) => x.battleCreate.mode);
  const modifiers = useAppSelector((x) => x.battleCreate.modifiers);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const dispatch = useAppDispatch();
  const bet2fa = useBet2fa();
  const navigate = useNavigate();

  const handleCreate = usePost(
    async () => {
      if (!mode) {
        return;
      }

      if (!emailConfirmed) {
        return Dialogs.open("primary", <UserEmailConfirmModal />);
      }
      if (kycTier < 1) {
        return Dialogs.open("primary", <VerificationModal />);
      }

      const entryCost = chests.reduce(
        (acc, x) => (acc += x.openCost * x.count),
        0,
      );

      if (entryCost > tokenBalance) {
        throw new Error("You do not have enough tokens.");
      }

      const betToken = await bet2fa();

      const { battleId } = await CaseBattles.createBattle({
        mode,
        chests: chests.map((x) => ({ id: x._id, count: x.count })),
        modifiers,
        betToken,
      });

      Gtm.trackBet({
        game: "case-battles",
        tokenAmount: entryCost,
      });

      navigate(`/case-battles/${battleId}`);
    },
    (x) => dispatch(CaseBattles.setCreatorProcessing(x)),
  );

  return handleCreate;
}
