import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
export const DiceFeedHeader = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div  
      fx
      height={56}
      align="center"
      gap={24}
      py={12}
      borderWidth={1}
      borderColor="brown-4"
      borderTop
      borderBottom
    >
      <Div
        className="user"
        flexBasis={0}
        grow={4}
      >
        <Span
          weight="medium"
          size={12}
          color="dark-sand"
          textTransform="uppercase"
        >
          {"User"}
        </Span>
      </Div>
      {["tablet", "laptop", "desktop"].includes(layout) && (
        <Div
          className="time"
          flexBasis={0}
          grow={4}
        >
          <Span
           weight="medium"
           size={12}
           color="dark-sand"
           textTransform="uppercase"
          >
            {"Time"}
          </Span>
        </Div>
      )}
      {["laptop", "desktop"].includes(layout) && (
        <Div
          className="amount"
          flexBasis={0}
          grow={4}
        >
          <Span
            weight="medium"
            size={12}
            color="dark-sand"
            textTransform="uppercase"
          >
            {"Bet Amount"}
          </Span>
        </Div>
      )}
      <Div
          className="multiplier"
          flexBasis={0}
          grow={2}
        >
          <Span
            weight="medium"
            size={12}
            color="dark-sand"
            textTransform="uppercase"
          >
            {"Multiplier"}
          </Span>
      </Div>
      <Div
        className="result"
        flexBasis={0}
        grow={3}
        justify="flex-end"
      >
        <Span
          weight="medium"
          size={12}
          color="dark-sand"
          textTransform="uppercase"
        >
          {"Payout"}
        </Span>
      </Div>
    </Div>
  );
};
