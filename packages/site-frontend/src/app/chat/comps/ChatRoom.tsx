import { usePresence } from "#app/hooks/sockets/usePresence";
import { useStream } from "#app/hooks/sockets/useStream";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Chat } from "#app/services/chat";

export const ChatRoom = () => {
  const channel = useAppSelector((x) => x.chat.channel);
  const dispatch = useAppDispatch();

  usePresence({
    joinKey: "chat-join",
    leaveKey: "chat-leave",
    roomKey: channel,
  });

  useStream({
    key: "chat-stream",
    maxLogSize: Chat.logSize,
    onChange: (x) => dispatch(Chat.setMessages(x.slice())),
  });

  useStream({
    key: "chat-rain-stream",
    maxLogSize: 1,
    onChange: (x) => dispatch(Chat.setRain({ ...x[0] })),
  });

  return null;
};
