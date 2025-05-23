import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dialogs } from "@client/services/dialogs";
import { kycTiers } from "@core/services/validation/Validation";
import { ModalKind } from "@client/services/dialogs/Dialogs";
import { Validation } from "@core/services/validation";
import { tierOneVerification, tierTwoVerification, tierThreeVerification } from "./tiers/tiers";

type TierRequirementOption = keyof typeof kycTiers;

export const useKycTierRequirement = ({
  requiredTier,
  modalKind = "primary",
  callback,
  sequential = false,
  enforceMinTier = false,
}: {
  requiredTier: TierRequirementOption | number;
  modalKind?: ModalKind;
  callback?: () => void;
  sequential?: boolean;
  enforceMinTier?: boolean;
}) => {
  const kycTier = useAppSelector((x) => x.user.kyc.tier) ?? 0;
  const kycMinTier = useAppSelector((x) => x.user.kyc.minTier) ?? 0;
  const isTierNumber = typeof requiredTier === "number";
  let requiredTierNumber = isTierNumber ? requiredTier : kycTiers[requiredTier];

  if (enforceMinTier) {
    if (kycMinTier > requiredTierNumber) {
      requiredTierNumber = kycMinTier;
    }
  }

  const tierRequirementMet = kycTier >= requiredTierNumber;

  const kycFlow = () => {
    if (!tierRequirementMet) {
      // This will force-close any modal that is sharing the same hierarchy
      Dialogs.close(modalKind);

      if (kycTier < Validation.kycTiers.email) {
        return tierOneVerification({ modalKind, callback, sequential });
      }

      if (kycTier < Validation.kycTiers.personalInfo) {
        return tierTwoVerification({ modalKind, callback, sequential });
      }

      if (kycTier < Validation.kycTiers.sumsub) {
        return tierThreeVerification({ modalKind, callback, sequential });
      }
    } else {
      return null;
    }
  };

  return {
    tierRequirementMet,
    kycFlow,
  };
};
