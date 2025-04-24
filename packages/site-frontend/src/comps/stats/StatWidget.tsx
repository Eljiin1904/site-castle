import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { CardSection } from "@client/comps/cards/CardSection";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";

export const StatWidget = ({title, tokens, description,icon}:{
  title?:string,
  tokens?: number;
  description:string,
  icon:Svg
}) => {
  
    const layout = useAppSelector((x) => x.style.mainLayout);
    const small = layout === "mobile" || layout === "tablet";
    return (<CardSection 
            border 
            borderColor="brown-4" 
            position="header" 
            grow 
            fx 
            gap={16} 
            px={small ? 20: 16} 
            alignItems="center" 
            justifyContent="space-between"
            >
              <Div column gap={12} grow>
                {tokens !== undefined && <Tokens fontSize={24} value={tokens} justifyContent="flex-start" />}
                {title !== undefined && <Heading  
                  as="h3"
                  size={24}
                  fontWeight="regular"
                  textTransform="uppercase">
                  {title}
                </Heading>}            
                <Span>{description}</Span>
              </Div>
              <Div bg="brown-4" py={16} px={16}>
                <Vector as={icon} color="sand" size={24} />
              </Div>
    </CardSection>);
};
