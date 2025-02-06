import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { CardSection } from "@client/comps/cards/CardSection";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";

export const StatSlide = ({
  label,
  icon,
  value,
  field,
  position,
}: {
  label: string;
  icon?: Svg;
  value: number | undefined;
  field: "count" | "tokens" | "intimal";
  position?: "header";
}) => {
  return (
    <CardSection position={position}>
      <Div grow>
        <Span>{label}</Span>
      </Div>
      <Div
        align="center"
        gap={4}
      >
        {icon && (
          <Vector
            as={icon}
            color="yellow"
            size={14}
          />
        )}
        {value === undefined ? (
          <Span
            family="title"
            weight="bold"
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
                color="white"
              >
                {Numbers.toLocaleString(value, 0)}
              </Span>
            }
            tokens={<Tokens value={value} />}
            intimal={
              <Span
                family="title"
                weight="bold"
                color="white"
              >
                {Intimal.toLocaleString(value, 0)}
              </Span>
            }
          />
        )}
      </Div>
    </CardSection>
  );
};
