import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";

export const MenuSeparator = () => {
  
  const small = useIsMobileLayout();
  return (
    <Div
      fx
      p={small ? 20: 24}
    >
      <Div
        fx
        borderTop
        borderColor="brown-4"
      />
    </Div>
  );
};