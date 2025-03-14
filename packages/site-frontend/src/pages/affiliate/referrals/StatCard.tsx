  import { Intimal } from "@core/services/intimal";
  import { Numbers } from "@core/services/numbers";
  import { Card } from "@client/comps/cards/Card";
  import { Div } from "@client/comps/div/Div";
  import { Span } from "@client/comps/span/Span";
  import { Tokens } from "@client/comps/tokens/Tokens";
  import { Vector } from "@client/comps/vector/Vector";
import { Img } from "@client/comps/img/Img";

  export const StatCard = ({
    label,
    icon,
    value,
    field,
    special,
    button
  }: {
    label: string;
    icon?: Svg;
    value: number | undefined;
    field: "count" | "tokens" | "intimal";
    special?: boolean;
    button?: JSX.Element;
  }) => {
    
    const headerCololor = special ? "dark-brown" : "light-sand";
    const textColor = special ? "dark-brown" : "dark-sand";
    return (
      <Card
        fx
        justify="space-between"
        p={24}
        bg={special ? "sand" : undefined}
      >
        {special && <Img
          type="png"
          path="/graphics/dark-sand-gradient"
          position="absolute"
          bottom={0}
          left={0}
          width="100%" />}
        <Div 
          column
          gap={8}
          justifyContent="space-between"
        >
          <Span
            family="title"
            size={32}
            color={headerCololor}
          >
            {value === undefined ? "--" : (
              field === "count" ? Numbers.toLocaleString(value, 0) : field === "tokens" ? (
                <Tokens
                  value={value}
                  fontSize={32}
                  vectorColor="sand"
                  color={headerCololor}
                  family="title"
                />
              ) : Intimal.toLocaleString(value
              )
            )}
          </Span>
          <Span
          color={textColor}
          size={16}
          fontWeight="medium"
          >{label}</Span>
        </Div>
        <Div
          align="center"
          gap={4}
        >
          {icon && (
            <Vector
              as={icon}
              size={20}
              color="sand"
              bg="brown-4"
              p={20}
            />
          )}

          {button && button}  
        </Div>
      </Card>
    );
  };
