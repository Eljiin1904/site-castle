import { useQueryClient } from "@tanstack/react-query";
import { Validation } from "@core/services/validation";
import { UserDocument } from "@core/types/users/UserDocument";
import { Button } from "@client/comps/button/Button";
import { Card } from "@client/comps/cards/Card";
import { CardSection } from "@client/comps/cards/CardSection";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Toasts } from "@client/services/toasts";
import { Users } from "#app/services/users";
import { Verification } from "#app/services/verification";
import { SumsubCard } from "./SumsubCard";

export const SumsubBody = ({ user }: { user: UserDocument }) => {
  const userId = user._id;
  const kycTier = user.kyc.tier;
  const kycMinTier = user.kyc.minTier ?? 0;
  const queryClient = useQueryClient();

  async function handlePerformKycRequest() {
    try {
      await Users.requestMinKycTier({ userId, minTier: 3 });
    } catch (e) {
      Toasts.error(e);
    }
    queryClient.invalidateQueries({ queryKey: ["user", userId] });
  }

  async function handleKycDataFetchRequest() {
    try {
      await Verification.updateSumsubApplicantData({ userId });
    } catch (e) {
      Toasts.error(e);
    }
    queryClient.invalidateQueries({ queryKey: ["user", userId] });
  }

  let bodyContent;

  if (kycTier < Validation.kycTiers.sumsub) {
    bodyContent = (
      <Div
        fx
        gap={16}
      >
        <Card column>
          <CardSection position="header">
            <Heading>{"Sumsub info not available"}</Heading>
          </CardSection>
          <CardSection
            column
            gap={16}
          >
            <Span>{"The user has not completed tier 3 verification."}</Span>
            <Button
              kind="primary"
              size="sm"
              label={
                kycMinTier >= 3
                  ? "KYC Requested from User"
                  : "Request user to KYC"
              }
              labelSize={14}
              disabled={kycMinTier >= 3}
              onClick={handlePerformKycRequest}
            />
          </CardSection>
        </Card>
        <Card column>
          <CardSection position="header">
            <Heading>{"Fetch KYC data"}</Heading>
          </CardSection>
          <CardSection
            column
            gap={16}
          >
            <Span>
              {
                "If the user has performed KYC but the data is not complete, fetch the KYC data here."
              }
            </Span>
            <Button
              kind="primary"
              size="sm"
              label={"Fetch KYC data"}
              labelSize={14}
              onClick={handleKycDataFetchRequest}
            />
          </CardSection>
        </Card>
      </Div>
    );
  } else {
    bodyContent = <SumsubCard user={user} />;
  }

  return (
    <Div
      fx
      gap={16}
    >
      {bodyContent}
    </Div>
  );
};
