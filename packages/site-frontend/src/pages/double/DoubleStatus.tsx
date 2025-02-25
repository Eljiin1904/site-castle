import { Circle } from "@client/comps/circle/Circle";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import "./DoubleStatus.scss";

export const DoubleStatus = ({ status }: { status: "Online" | "Offline" }) => {
  return (
    <Div
      className={"DoubleStatus"}
      align="center"
      justify="center"
      px={6}
      bg="brown-9"
      style={{
        width: 115,
      }}
    >
      <Circle
        as="div"
        width={8}
        height={8}
        color="white"
        alignItems="center"
        justifyContent="center"
        bg={status == "Online" ? "bright-green" : "bright-red"}
        mr={5}
      />
      <Span
        color="white"
        fontSize={12}
      >
        Status {status}
      </Span>
    </Div>
  );
};
