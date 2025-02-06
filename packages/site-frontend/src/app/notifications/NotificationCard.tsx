import { useState } from "react";
import { NotificationDocument } from "@core/types/notifications/NotificationDocument";
import { Card } from "@client/comps/cards/Card";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Vector } from "@client/comps/vector/Vector";
import { SvgTimesCirlce } from "@client/svgs/common/SvgTimesCircle";
import { Timestamp } from "@client/comps/timestamp/Timestamp";
import { Notifications } from "#app/services/notifications";
import { useDelete } from "./useDelete";

export const NotificationCard = ({
  notification,
}: {
  notification: NotificationDocument;
}) => {
  const [hovered, setHovered] = useState(false);
  const message = Notifications.getMessage(notification);

  const handleDelete = useDelete();

  return (
    <Card
      column
      p={8}
      justify="space-between"
      cursor="pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Paragraph>{message}</Paragraph>
      <Timestamp
        date={notification.timestamp}
        format="elapsed"
        color="dark-gray"
        size={12}
        mt={6}
      />
      {hovered && (
        <Vector
          as={SvgTimesCirlce}
          position="absolute"
          top={4}
          right={4}
          hover="highlight"
          onClick={() => handleDelete(notification._id)}
        />
      )}
    </Card>
  );
};
