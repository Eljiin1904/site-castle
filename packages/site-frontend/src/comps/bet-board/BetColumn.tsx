import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div, DivProps } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { FC } from "react";

export const BetColumn: FC<{ hideInMobile?:boolean, children: any} & DivProps>  = ({
  children,
  hideInMobile = false,
  ...forwardProps
}) => {

  const small = useIsMobileLayout();
  if (hideInMobile && small) return null;

  return (<Div {...forwardProps}>
    <Span
      weight="medium"
      size={14}
      color="light-sand"
    >
      {children}
    </Span>
  </Div>);
};