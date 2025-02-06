import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Spinner } from "@client/comps/spinner/Spinner";
import { StatusBar } from "../comps/StatusBar";

export const LoadingContent = () => {
  return (
    <Div
      column
      fx
      grow
      gap={24}
    >
      <StatusBar
        label="2/3: Creating Offer"
        progress={0.333}
      />
      <Div
        column
        center
        py={16}
        gap={16}
        grow
        bg="gray-8"
        border
      >
        <Spinner
          size={48}
          color="gold"
        />
        <Span size={12}>{"Creating Trade Offer"}</Span>
      </Div>
    </Div>
  );
};
