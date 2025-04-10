import { NotificationDocument } from "@core/types/notifications/NotificationDocument";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Button } from "@client/comps/button/Button";
import { SvgBell } from "@client/svgs/common/SvgBell";
import { Vector } from "@client/comps/vector/Vector";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Notifications } from "#app/services/notifications";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { NotificationCard } from "./NotificationCard";
import { NotificationHeader } from "./NotificationHeader";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dialogs } from "@client/services/dialogs";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ClearNotificationsButton } from "./ClearNotificationsButton";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const AppNotifications = () => {

  const layout = useAppSelector((x) => x.style.mainLayout);

  return (<Conditional 
    value={layout} 
    mobile={<UserAppNotificationsMenuMobile />}
    tablet={<UserAppNotificationsMenuDesktop />}
    laptop={<UserAppNotificationsMenuDesktop />}
    desktop={<UserAppNotificationsMenuDesktop />}
    />);
};

export const UserAppNotificationsMenuDesktop = () => {
  const open = useAppSelector((x) => x.notifications.open);
  const dispatch = useAppDispatch();

  return (
    <Dropdown
      type="custom"
      menuWidth="328px"
      forceAlign="right"
      clampHeight
      open={open}
      onToggle={() => {
        dispatch(Notifications.setOpen(!open));
      }}
      button={<NotificationsMenuButton />}
      body={<BodyContent/>}
    />
  );
};

const UserAppNotificationsMenuMobile = () => {

  return (<Div
    flexCenter
    onClick={() => Dialogs.open("primary", <UserNotificationsModal />)}
  >
    <NotificationsMenuButton />
  </Div>);
};

const UserNotificationsModal = () => {
  
  const log = useAppSelector((x) => x.notifications.log);
  const small = useIsMobileLayout();
  const {t} = useTranslation();

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("notifications.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <Div
        fx
        column
        px={20}
      >
      {log.length === 0 ?  <Span color="white">{t("notifications.noNotifications")}</Span>: <Div fx column>
      <ClearNotificationsButton />
        <Div fx column px={small ? 0: 24}>
          {log.slice(0, Math.min(10, log.length)).map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              last={notification._id === log[log.length - 1]._id}
            />
          ))}
        </Div>
      </Div>}

      </Div>
    </Modal>
  );
};

const NotificationsMenuButton = () => {

  const log = useAppSelector((x) => x.notifications.log);
  return (<Button
    kind="custom"
    bg="black-hover"
    size="icon"
    position="relative"
  >
    <Vector
      as={SvgBell}
      size={20}
      color={log.length > 0 ? "sand" : "dark-sand"}
      hover="highlight"
    />
    {log.length > 0 && (
      <Div
        bg="sand"
        width={14}
        height={14}
        position="absolute"
        bottom={8}
        left={16}
        color="sand"
        border
        borderWidth={4}
      />
    )}
  </Button>);
};

const BodyContent = () => {
  
  const log = useAppSelector((x) => x.notifications.log);
  const {t} = useTranslation();
  let content;
  
  if (log.length === 0) {
    content = (
      <Div
        fx
        py={16}
        px={24}
      >
        <Span color="white">{t("notifications.noNotifications")}</Span>
      </Div>
    );
  } else {
    content = (
      <Div
        fx
        column
        overflow="auto"
      >
        <NotificationHeader heading={t("notifications.title")} />
        <Div fx column px={24}>
          {log.slice(0, Math.min(10, log.length)).map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              last={notification._id === log[log.length - 1]._id}
            />
          ))}
        </Div>
      </Div>
    );
  }

  return (
    <DropdownBody
      bg="brown-4"
      borderColor="brown-4"
    >
      {content}
    </DropdownBody>
  );
};