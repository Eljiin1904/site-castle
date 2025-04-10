import { useState } from "react";
import { NotificationDocument } from "@core/types/notifications/NotificationDocument";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Vector } from "@client/comps/vector/Vector";
import { SvgTimesCirlce } from "@client/svgs/common/SvgTimesCircle";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { Notifications } from "#app/services/notifications";
import { useDelete } from "./useDelete";
import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import './NotificationCard.scss';

export const NotificationCard = ({
  notification,
  last
}: {
  notification: NotificationDocument;
  last?: boolean;
}) => {
  // const [hovered, setHovered] = useState(false);
  const message = Notifications.getMessage(notification);
  const icon = Notifications.getIcon(notification);
  const small = useIsMobileLayout();
  const handleDelete = useDelete();

  console.log("NotificationCard", notification, message);

  return (
    <Div
      className="NotificationCard"
      border={false}
      borderBottom={!last}
      borderColor={small ? "brown-4" : "dark-brown-hover"}
      py={16}
      justify="space-between"
      cursor="pointer"
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
      fx
      gap={16}
    >
      <Vector as={icon} size={16} color="light-sand" />
      <Paragraph color="light-sand">{message}</Paragraph>
      <Timestamp
        date={notification.timestamp}
        format="elapsed"
        size={12}
      />
      {/* {hovered && (
        <Vector
          as={SvgTimesCirlce}
          position="absolute"
          top={4}
          right={4}
          hover="highlight"
          onClick={() => handleDelete(notification._id)}
        />
      )} */}
    </Div>
  );
};
