import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { CardSection, CardSectionProps } from "@client/comps/cards/CardSection";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Img } from "@client/comps/img/Img";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";

/**
 * Stat Widget component, will display title or token value with description, will also display an icon or button if provided
 * If a button is provided, it will display a graphic image as background and will use different text color
 * If reverse is true, it will display the description first and the title or token value second
 * @param param0 
 * @returns 
 */
export const StatWidget = ({title, tokens, description,icon,withAction,button,reverse = false, ...forwardProps}: CardSectionProps & {
  title?:string,
  tokens?: number;
  description:string,
  icon?:Svg,
  withAction?: boolean,
  button?: JSX.Element;
  reverse?: boolean;
}) => {
  
    const layout = useAppSelector((x) => x.style.mainLayout);
    const small = layout === "mobile" || layout === "tablet";
    const {border, borderColor,gap, px, py, alignItems, ...props} = forwardProps;
    const textColor = withAction ? "dark-brown" : "dark-sand";
    return (<CardSection 
            border={border ?? true}
            borderColor="brown-4" 
            position="header" 
            grow 
            fx 
            gap={gap ?? 16}
            py={py ?? (small ? 20 : 24)}
            px={px ?? (small ? 20 : 24)}
            alignItems={alignItems ?? "center"} 
            justifyContent="space-between"
            bg={withAction ? "sand" : undefined}

            {...props}
            >
              {withAction && <Img
                type="png"
                path="/graphics/dark-sand-gradient"
                position="absolute"
                bottom={0}
                left={0}
                width="100%" />}
              <Div column gap={12} grow>
                {reverse &&  <Span color={textColor}>{description}</Span>}
                {tokens !== undefined && <Tokens color={reverse ? 'light-sand':textColor} family="title" fontSize={24} value={tokens} justifyContent="flex-start" />}
                {title !== undefined && <Heading  
                  as="h3"
                  size={24}
                  fontWeight="regular"
                  textTransform="uppercase"
                  color={reverse ? 'light-sand':textColor}
                  >
                  {title}
                </Heading>}            
               {!reverse && <Span color={textColor}>{description}</Span>}
              </Div>
              {icon && <Div bg="brown-4" py={16} px={16}>
                <Vector as={icon} color="sand" size={24} />
              </Div>}
              {button && button} 
    </CardSection>);
};