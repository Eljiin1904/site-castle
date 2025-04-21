import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { ProgressBar } from "@client/comps/progress-bar/ProgressBar";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationHeader } from "./VerificationHeader";
import { VerificationEmail } from "./VerificationEmail";
import { VerificationPersonal } from "./VerificationPersonal";
import { VerificationIdentity } from "./VerificationIdentity";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const VerificationBodyOld = () => {
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const kycTierInt = Numbers.floor(kycTier, 0);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const tiers = 4;

  return (
    <Div
      fx
      column
      gap={16}
    >
      <Div
        fx
        column
        p={small ? 16 : 24}
        gap={12}
        bg="brown-6"
        border
      >
        <Heading
          as="h2"
          size={16}
        >
          {`Tier ${Numbers.floor(Numbers.min(kycTier + 1, tiers), 0)}`}
        </Heading>
        <ProgressBar
          height={8}
          progress={kycTier / tiers}
        />
        <Span>{`You have completed ${kycTierInt} of ${tiers} tiers.`}</Span>
      </Div>
      <Div
        fx
        column
        p={small ? 16 : 24}
        bg="brown-6"
        border
      >
       
      </Div>
    </Div>
  );
};

export const VerificationBody = () => {
  
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const kycTierInt = Numbers.floor(kycTier, 0);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const small = useIsMobileLayout();
  const currentTier = emailConfirmed ? kycTierInt + 1 : 0;

  return (
    <Div
      fx
      column
      gap={40}
      pt={small ? 40: 0}
    >
      <VerificationHeader tier={currentTier}/>
      <Div fx column gap={16}>
        <VerificationEmail tier={currentTier} />
        <VerificationPersonal tier={currentTier}/>
        <VerificationIdentity tier={currentTier}/>     
      </Div>       
    </Div>
  );
};
