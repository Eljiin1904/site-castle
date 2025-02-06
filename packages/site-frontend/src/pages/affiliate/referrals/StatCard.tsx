import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Card } from "@client/comps/cards/Card";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";

export const StatCard = ({
  label,
  icon,
  value,
  field,
}: {
  label: string;
  icon?: Svg;
  value: number | undefined;
  field: "count" | "tokens" | "intimal";
}) => {
  return (
    <Card
      fx
      column
      center
      p={16}
    >
      <Span mb={13}>{label}</Span>
      <Div
        align="center"
        gap={4}
      >
        {icon && (
          <Vector
            as={icon}
            size={20}
            color="gold"
          />
        )}
        {value === undefined ? (
          <Span
            family="title"
            weight="bold"
            size={20}
            color="white"
          >
            {"--"}
          </Span>
        ) : (
          <Conditional
            value={field}
            count={
              <Span
                family="title"
                weight="bold"
                size={20}
                color="white"
              >
                {Numbers.toLocaleString(value, 0)}
              </Span>
            }
            tokens={
              <Tokens
                value={value}
                fontSize={20}
              />
            }
            intimal={
              <Span
                family="title"
                weight="bold"
                size={20}
                color="white"
              >
                {Intimal.toLocaleString(value, 0)}
              </Span>
            }
          />
        )}
      </Div>
    </Card>
  );
};
