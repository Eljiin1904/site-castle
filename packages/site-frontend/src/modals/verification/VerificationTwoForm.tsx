import { useEffect, useState } from "react";
import { Conditional } from "#client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationTwoWholeForm } from "./VerificationTwoWholeForm";
import { VerificationTwoPartOneForm } from "./VerificationTwoPartOneForm";
import { VerificationTwoPartTwoForm } from "./VerificationTwoPartTwoForm";
import { VerificationTwoPartThreeForm } from "./VerificationTwoPartThreeForm";

export const VerificationTwoForm = ({
  layout,
  disableClose,
  whole,
}: {
  layout: Layout;
  disableClose?: boolean;
  whole?: boolean;
}) => {
  const kycTier = useAppSelector((x) => x.user.kyc.tier);

  const tierOneSteps = ["zero", "one", "two", "three"] as const;
  const [kycStep, setKycStep] = useState<number>(0);

  useEffect(() => {
    setKycStep(getVerificationTwoStep({ tier: kycTier }));
    function getVerificationTwoStep({ tier }: { tier: number }): number {
      let step: number;
      if (whole) {
        step = tierOneSteps.indexOf("zero");
      } else if (tier < 1.1) {
        step = tierOneSteps.indexOf("one");
      } else if (tier < 1.2) {
        step = tierOneSteps.indexOf("two");
      } else {
        step = tierOneSteps.indexOf("three");
      }
      return step;
    }
  }, [whole, kycTier]);

  return (
    <Conditional
      value={tierOneSteps[kycStep]}
      zero={
        <VerificationTwoWholeForm
          layout={layout}
          disableClose={disableClose}
        />
      }
      one={
        <VerificationTwoPartOneForm
          layout={layout}
          disableClose={disableClose}
        />
      }
      two={
        <VerificationTwoPartTwoForm
          layout={layout}
          disableClose={disableClose}
        />
      }
      three={
        <VerificationTwoPartThreeForm
          layout={layout}
          disableClose={disableClose}
        />
      }
    />
  );
};
