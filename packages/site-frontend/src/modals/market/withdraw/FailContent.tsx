import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCancel } from "@client/svgs/common/SvgCancel";
import { StatusBar } from "../comps/StatusBar";

export const FailContent = () => {
  return (
    <Div
      column
      fx
      grow
      gap={24}
    >
      <StatusBar
        label="Withdraw Cancelled"
        progress={0}
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
          as={SvgCancel}
          color="light-red"
          size={48}
        />
        <Span size={12}>{"Withdraw Cancelled"}</Span>
      </Div>
    </Div>
  );
};
