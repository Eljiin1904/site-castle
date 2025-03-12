import { SvgTimesCirlce } from "#client/svgs/common/SvgTimesCircle";
import { Button } from "../button/Button";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { Vector } from "../vector/Vector";

export const FormErrorBox = ({
  error,
  onAck,
}: {
  error: string;
  onAck: () => void;
}) => {
  return (
    <Div
      className="error-box"
      position="absolute"
      top={0}
      fx
      fy
      column
      center
      gap={16}
    >
      <Div
        fx
        grow
        center
        column
        gap={8}
        bg="brown-8"
        border
        borderColor="red"
      >
        <Vector
          as={SvgTimesCirlce}
          size={24}
          color="light-red"
        />
        <Span>{error}</Span>
      </Div>
      <Button
        kind="primary"
        fx
        label="Okay"
        onClick={onAck}
      />
    </Div>
  );
};
