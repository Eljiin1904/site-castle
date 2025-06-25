import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { LegalSubHeader } from "./LegalSubHeader";

export const LegalSection = ({heading, children}: {heading?: string, children: React.ReactNode}) => {
  const small = useIsMobileLayout();
  return (
    <Div  column
    gap={small ? 16 : 24}>
      {heading && <LegalSubHeader text={heading} />}
      {children}
    </Div>
  );
};