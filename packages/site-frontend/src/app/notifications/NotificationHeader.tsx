import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";


export const NotificationHeader = ({heading}: {heading: string}) => {
  
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const small = layout === "mobile";

  return (<Div
          fx
          flexCenter
          py={16}
          px={24}          
          borderBottom
          borderColor="dark-brown-hover"
        >
          <Heading
              as="h2"
              size={small ? 18 : 20}
              fontWeight="regular"
              fx
            >
              {heading}
            </Heading>
            <Button
              kind="custom"
              bg="brown-4"
              label="Clear"
              borderColor="dark-brown-hover"
              labelColor="dark-sand"
              border
              onClick={() => {}}
            />
    </Div>);
};