import { useState } from "react";
import { useDelay } from "@client/hooks/system/useDelay";
import { usePost } from "@client/hooks/system/usePost";
import { Chat } from "#app/services/chat";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

export function useSendMessage() {
  const text = useAppSelector((x) => x.chat.input);
  const channel = useAppSelector((x) => x.chat.channel);
  const replyMessage = useAppSelector((x) => x.chat.replyMessage);
  const [sendDisabled, setSendDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const delayEnableSend = useDelay(() => setSendDisabled(false), 2000);

  const sendMessage = usePost(async () => {
    if (sendDisabled || text.trim().length === 0) {
      return;
    }

    dispatch(Chat.setInput(""));
    dispatch(Chat.setReplyMessage(undefined));

    setSendDisabled(true);

    try {
      await Chat.sendMessage({
        text,
        channel,
        replyMessageId: replyMessage?._id,
      });
      delayEnableSend();
    } catch (err) {
      setSendDisabled(false);
      throw err;
    }
  });

  return sendMessage;
}
