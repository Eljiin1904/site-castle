import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Heading } from "@client/comps/heading/Heading";

export const LegalSubHeader = ({text}: {text: string}) => {
  
  const small = useIsMobileLayout();
  return (<Heading size={small? 16: 20} textTransform="uppercase">{text}</Heading>);
};