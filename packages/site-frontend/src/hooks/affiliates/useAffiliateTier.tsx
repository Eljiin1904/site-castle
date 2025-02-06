import { useMemo } from "react";
import { Affiliates } from "@core/services/affiliates";
import { useAppSelector } from "../store/useAppSelector";

export function useAffiliateTier() {
  const xp = useAppSelector((x) => x.user.affiliate.referralXp || 0);
  const baseTier = useAppSelector((x) => x.user.affiliate.baseTier);

  const state = useMemo(() => {
    const tier = Affiliates.getTier(xp);
    const tierStartXp = Affiliates.getReferralXP(tier);
    const tierEndXp = Affiliates.getReferralXP(tier + 1);

    return {
      xp,
      baseTier,
      tier,
      tierProgress: xp - tierStartXp,
      tierGoal: tierEndXp - tierStartXp,
    };
  }, [xp, baseTier]);

  return state;
}
