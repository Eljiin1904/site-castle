import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { StatusBar } from "../comps/StatusBar";

export const CompleteContent = () => {
  return (
    <Div
      column
      fx
      grow
      gap={24}
    >
      <StatusBar
        label="Deposit Completed"
        progress={1}
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
        <Vector
          as={SvgCheckCircle}
          color="green"
          size={48}
        />
        <Span size={12}>{"Deposit Completed"}</Span>
      </Div>
    </Div>
  );
};
