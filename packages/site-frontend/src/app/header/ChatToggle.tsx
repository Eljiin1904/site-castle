import { Button } from "@client/comps/button/Button";
import { SvgChat } from "@client/svgs/common/SvgChat";
import { Chat } from "#app/services/chat";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";

export const ChatToggle = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const collapsed = useAppSelector((x) => x.chat.panelCollapsed);
  const dispatch = useAppDispatch();
  const messages = [];//useAppSelector((x) => x.chat.messages);
  if (["mobile", "tablet"].includes(layout)) {
    return null;
  }

  return (
    <Button
      kind="custom"
      bg="black-hover"
      size="icon"
      onClick={() => dispatch(Chat.collapsePanel(!collapsed))}
      position="relative"
    >
      <Vector
        as={SvgChat}
        size={16}
        color={messages.length > 0 ? "sand" : "dark-sand"}
        hover="highlight"
      />
      {messages.length > 0 && (
        <Div
          bg="sand"
          width={14}
          height={14}
          position="absolute"
          bottom={10}
          left={20}
          color="sand"
          border
          borderWidth={4}
          zIndex={1}
        />
      )}
    </Button>
  );
};
