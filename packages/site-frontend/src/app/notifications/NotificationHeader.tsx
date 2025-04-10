import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { ClearNotificationsButton } from "./ClearNotificationsButton";

export const NotificationHeader = ({heading}: {heading: string}) => {
  
  const small = useIsMobileLayout();

  return (<Div
          fx
          flexCenter
          py={12}
          px={small ? 0: 24}          
          borderBottom
          borderColor="dark-brown-hover"
          column={small}
          gap={16}
        >
          <Heading
              as="h2"
              size={small ? 16 : 16}
              fontWeight="regular"
              textTransform="uppercase"
              fx
            >
              {heading}
            </Heading>
            <ClearNotificationsButton />
    </Div>);
};