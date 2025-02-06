import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const BetHeader = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      className="BetHeader"
      fx
      mt={8}
      height={40}
      align="center"
      gap={24}
      px={12}
      bg="brown-6"
    >
      <Div
        className="game"
        flexBasis={0}
        grow={3}
      >
        <Span
          family="title"
          weight="bold"
          size={14}
          color="gray"
        >
          {"Game"}
        </Span>
      </Div>
      {["tablet", "laptop", "desktop"].includes(layout) && (
        <Div
          className="player"
          flexBasis={0}
          grow={4}
        >
          <Span
            family="title"
            weight="bold"
            color="gray"
          >
            {"Player"}
          </Span>
        </Div>
      )}
      {["laptop", "desktop"].includes(layout) && (
        <Div
          className="time"
          flexBasis={0}
          grow={2}
        >
          <Span
            family="title"
            weight="bold"
            color="gray"
          >
            {"Time"}
          </Span>
        </Div>
      )}
      {["tablet", "laptop", "desktop"].includes(layout) && (
        <Div
          className="amount"
          flexBasis={0}
          grow={3}
          justify="flex-end"
        >
          <Span
            family="title"
            weight="bold"
            color="gray"
          >
            {"Wager"}
          </Span>
        </Div>
      )}
      {["tablet", "laptop", "desktop"].includes(layout) && (
        <Div
          className="multiplier"
          flexBasis={0}
          grow={3}
          justify="flex-end"
        >
          <Span
            family="title"
            weight="bold"
            color="gray"
          >
            {"Multiplier"}
          </Span>
        </Div>
      )}
      <Div
        className="result"
        flexBasis={0}
        grow={3}
        justify="flex-end"
      >
        <Span
          family="title"
          weight="bold"
          color="gray"
        >
          {"Payout"}
        </Span>
      </Div>
    </Div>
  );
};
