import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div, DivProps } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { FC } from "react";

export const BetHeaderColumn: FC<{header: string, hideInMobile?:boolean} & DivProps>  = ({header,hideInMobile = false, ...forwardProps}) => {

  const small = useIsMobileLayout();
  if (hideInMobile && small) return null;

  return (<Div {...forwardProps}>
    <Span
      weight="medium"
      size={12}
      color="dark-sand"
      textTransform="uppercase"
    >
      {header}
    </Span>
  </Div>);
};