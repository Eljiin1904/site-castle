import { useState } from "react";
import { useDelay } from "@client/hooks/system/useDelay";
import { usePost } from "@client/hooks/system/usePost";
import { Chat } from "#app/services/chat";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

/**
 * custom hook to send a gif as a chat message
 * @returns sendGif function that receives a gif url and convert it to a message.
 * gif message will follow the format [giphy:{url}]
 * @example
 * const sendGif = useSendGifAsMessage();
 * sendGif("https://media3.giphy.com/media/v1.Y2lkPTFjMDNlZWEwYXRzazc5cjV4bHJ5eHVrbDBzaDQxNTJqbXU4bGxhb2w1anJhc3MweiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/t63HgfXS5YKTUCtTF0/giphy.gif");
 */
export function useSendGifAsMessage() {
  
  const channel = useAppSelector((x) => x.chat.channel);
  const replyMessage = useAppSelector((x) => x.chat.replyMessage);
  const [sendDisabled, setSendDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const delayEnableSend = useDelay(() => setSendDisabled(false), 2000);

  const sendGif = usePost(async (_, url) => {
    if (sendDisabled || url.trim().length === 0) {
      return;
    }

    dispatch(Chat.setInput(""));
    dispatch(Chat.setReplyMessage(undefined));

    setSendDisabled(true);
    const text = `[giphy:${url}]`;

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

  return sendGif;
}
