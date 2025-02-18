import { NotificationDocument } from "@core/types/notifications/NotificationDocument";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Button } from "@client/comps/button/Button";
import { SvgBell } from "@client/svgs/common/SvgBell";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCircle } from "@client/svgs/common/SvgCircle";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Notifications } from "#app/services/notifications";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { NotificationCard } from "./NotificationCard";

export const AppNotifications = () => {
  const open = useAppSelector((x) => x.notifications.open);
  const log = useAppSelector((x) => x.notifications.log);
  const dispatch = useAppDispatch();

  return (
    <Dropdown
      type="custom"
      menuWidth="280px"
      forceAlign="right"
      clampHeight
      open={open}
      onToggle={() => {
        dispatch(Notifications.setOpen(!open));
      }}
      button={
        <Button
          kind="tertiary"
          size="sm"
          icon={SvgBell}
        >
          {log.length > 0 && (
            <Vector
              as={SvgCircle}
              size={6}
              position="absolute"
              bottom={6}
              right={6}
              color="yellow"
              border
              borderWidth={2}
              borderRadius="full"
              borderColor="brown-5"
            />
          )}
        </Button>
      }
      body={<BodyContent log={log} />}
    />
  );
};

const BodyContent = ({ log }: { log: NotificationDocument[] }) => {
  let content;

  if (log.length === 0) {
    content = (
      <Div
        fx
        p={16}
      >
        <Span>{"You don't have any notifications."}</Span>
      </Div>
    );
  } else {
    content = (
      <Div
        fx
        column
        p={8}
        gap={8}
        overflow="auto"
      >
        {log.slice(0, Math.min(10, log.length)).map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
          />
        ))}
      </Div>
    );
  }

  return (
    <DropdownBody
      bg="brown-8"
      borderColor="brown-4"
    >
      {content}
    </DropdownBody>
  );
};
