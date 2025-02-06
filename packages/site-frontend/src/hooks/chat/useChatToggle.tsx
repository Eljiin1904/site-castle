import { Chat } from "#app/services/chat";
import { useAppDispatch } from "../store/useAppDispatch";
import { useAppSelector } from "../store/useAppSelector";

export function useChatToggle() {
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const panelCollapsed = useAppSelector((x) => x.chat.panelCollapsed);
  const overlayOpen = useAppSelector((x) => x.chat.overlayOpen);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    if (layout === "mobile" || layout === "tablet") {
      dispatch(Chat.toggleOverlay(!overlayOpen));
    } else {
      dispatch(Chat.collapsePanel(!panelCollapsed));
    }
  };

  return handleToggle;
}
