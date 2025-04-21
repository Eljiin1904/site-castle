import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationOneForm } from "#app/modals/verification/VerificationOneForm";
import { Div } from "@client/comps/div/Div";

export const VerificationPersonal = ({tier}:{
  tier: number
}) => {

  const layout = useAppSelector((x) => x.style.mainLayout);
  if(tier !== 1) return;

  return (<Div
      fx
      gap={24}
      column
      alignItems="flex-start"
    >
    <VerificationOneForm
      layout={layout}
      whole
    />
  </Div>)
};