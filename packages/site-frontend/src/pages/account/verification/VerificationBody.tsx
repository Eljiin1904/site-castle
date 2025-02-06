import { Numbers } from "@core/services/numbers";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { ProgressBar } from "@client/comps/progress-bar/ProgressBar";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationOneForm } from "#app/modals/verification/VerificationOneForm";

export const VerificationBody = () => {
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
        {kycTier < 1 && (
          <Div
            column
            gap={16}
          >
            <Heading
              as="h2"
              size={16}
            >
              {"Verify Your Information"}
            </Heading>
            <Span>{"We need to verify your personal information."}</Span>
            <Div
              borderBottom
              mb={8}
            />
            <VerificationOneForm
              layout={layout}
              whole
            />
          </Div>
        )}
        {kycTierInt > 0 && kycTierInt < tiers && (
          <Div
            column
            gap={16}
          >
            <Heading as="h2">{"No Action Required"}</Heading>
            <Span>{"You are up to date."}</Span>
          </Div>
        )}
        {kycTier === 100 && (
          <Div
            column
            gap={16}
          >
            <Heading as="h2">{"Submit Your Identity Documents"}</Heading>
            <Span>
              {
                "We need to verify proof your identity. The verification process will handled securely by our partner."
              }
            </Span>
            <Div>
              <Button
                kind="primary"
                label="Start Verification"
                disabled
              />
            </Div>
          </Div>
        )}
      </Div>
    </Div>
  );
};
