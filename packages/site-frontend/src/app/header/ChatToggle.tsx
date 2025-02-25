import { Button } from "@client/comps/button/Button";
import { SvgChat } from "@client/svgs/common/SvgChat";
import { Chat } from "#app/services/chat";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const ChatToggle = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const collapsed = useAppSelector((x) => x.chat.panelCollapsed);
  const dispatch = useAppDispatch();

  if (["mobile", "tablet"].includes(layout)) {
    return null;
  }

  return (
    <Button
      kind="tertiary"
      size="sm"
      icon={SvgChat}
      onClick={() => dispatch(Chat.collapsePanel(!collapsed))}
    />
  );
};
