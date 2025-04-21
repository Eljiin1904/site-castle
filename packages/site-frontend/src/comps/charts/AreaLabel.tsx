import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";

export const AreaLabel = ({label, children}: {
  label?: string,
  children?: React.ReactNode
}) => {
  return (
    <Div
      position="absolute"
      left={24}
      top={0}
      py={14}
      zIndex={1}
    >
      {label !== undefined && <Span size={16} textTransform="uppercase" family="title" fontWeight="regular" color="light-sand">{label}</Span>}
      {children}
    </Div>
  );
}