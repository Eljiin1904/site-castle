import { useEffect, useState } from "react";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationOneWholeForm } from "./VerificationOneWholeForm";
import { VerificationOnePartOneForm } from "./VerificationOnePartOneForm";
import { VerificationOnePartTwoForm } from "./VerificationOnePartTwoForm";
import { VerificationOnePartThreeForm } from "./VerificationOnePartThreeForm";

export const VerificationOneForm = ({
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
    setKycStep(getVerificationOneStep({ tier: kycTier }));
    function getVerificationOneStep({ tier }: { tier: number }): number {
      let step: number;
      if (whole) {
        step = tierOneSteps.indexOf("zero");
      } else if (tier < 0.1) {
        step = tierOneSteps.indexOf("one");
      } else if (tier < 0.2) {
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
        <VerificationOneWholeForm
          layout={layout}
          disableClose={disableClose}
        />
      }
      one={
        <VerificationOnePartOneForm
          layout={layout}
          disableClose={disableClose}
        />
      }
      two={
        <VerificationOnePartTwoForm
          layout={layout}
          disableClose={disableClose}
        />
      }
      three={
        <VerificationOnePartThreeForm
          layout={layout}
          disableClose={disableClose}
        />
      }
    />
  );
};
