import { useRef } from "react";
import { useEventListener } from "usehooks-ts";
import { Div } from "@client/comps/div/Div";
import { useLocationChange } from "@client/hooks/system/useLocationChange";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Chat } from "#app/services/chat";
import { ChatRoom } from "./comps/ChatRoom";
import { ChatFooter } from "./comps/ChatFooter";
import { ChatHeader } from "./comps/ChatHeader";
import { ChatLog } from "./comps/ChatLog";
import { ChatRain } from "./comps/ChatRain";
import "./AppChatOverlay.scss";

export const AppChatOverlay = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const open = useAppSelector((x) => x.chat.overlayOpen);

  if (["laptop", "desktop"].includes(layout)) {
    return null;
  }

  if (!open) {
    return null;
  }

  return <OverlayContent />;
};

const OverlayContent = () => {
  const dispatch = useAppDispatch();
  const innerRef = useRef<HTMLDivElement>(null);

  useEventListener("mousedown", (e) => {
    const target = e.target as Element;

    if (innerRef.current?.contains(target)) {
      return;
    }

    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const isToggle = elements.some((x) => x.id === "chat-toggle");

    if (!isToggle) {
      dispatch(Chat.toggleOverlay(false));
    }
  });

  useLocationChange(() => {
    dispatch(Chat.toggleOverlay(false));
  });

  return (
    <Div
      className="AppChat AppChatOverlay"
      position="absolute"
      fx
    >
      <Div
        className="inner-content"
        forwardRef={innerRef}
        fx
        fy
        column
        bg="brown-6"
      >
        <ChatRoom />
        <ChatHeader />
        <ChatRain />
        <ChatLog />
        <ChatFooter />
      </Div>
    </Div>
  );
};
