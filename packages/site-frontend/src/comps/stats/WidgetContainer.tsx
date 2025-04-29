import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { StyledLayoutProps } from "@client/comps/styled/Styled";

export const WidgetContainer = ({
  column = false,
  children,
  ...forwardProps
}: StyledLayoutProps & {
  column?: boolean;
  children: React.ReactNode;
}) => {
  const small = useIsMobileLayout();
  return (
    <Div
      fx
      column={column}
      gap={small ? 16 : 24}
      wrap={small}
      {...forwardProps}
    >
      {children}
    </Div>
  );
}