import { useEffect, useRef, useState } from "react";
import { useTimeout } from "usehooks-ts";
import classNames from "classnames";
import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { useDelay } from "@client/hooks/system/useDelay";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ChatMessageCard } from "#app/comps/chat-message/ChatMessageCard";
import "./ChatLog.scss";

export const ChatLog = () => {
  const channel = useAppSelector((x) => x.chat.channel);
  const messages = useAppSelector((x) => x.chat.messages);
  const blocked = useAppSelector((x) => x.user.blockedUsers);
  const [log, setLog] = useState<ChatMessageDocument[]>([]);
  const [paused, setPaused] = useState(false);
  const [smooth, setSmooth] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setPaused(false);

    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useTimeout(() => setSmooth(true), 500);

  // input => scroll is smoothed, so delay for final value
  const handleUserInput = () => delayInput();
  const delayInput = useDelay(() => {
    if (listRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = listRef.current;
      const scroll = scrollHeight - scrollTop - clientHeight;
      setPaused(scroll > 20);
    }
  }, 200);

  useEffect(() => {
    setPaused(false);
  }, [channel]);

  useEffect(() => {
    if (!paused) {
      setLog(messages.slice().reverse());
    }
  }, [paused, messages]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [log]);

  const filteredLog = log.filter((message) => {
    if (message.agent === "user" && blocked.includes(message.user.id)) {
      return false;
    }
    return true;
  });

  return (
    <Div
      className={classNames("ChatLog", { smooth })}
      grow
      overflow="hidden"
    >
      <Div
        className="card-grid"
        forwardRef={listRef}
        column
        grow
        overflow="auto"
        onWheel={handleUserInput}
        onTouchMove={handleUserInput}
      >
        {filteredLog.map((x, i) => (
          <ChatMessageCard
            key={x._id}
            message={x}
          />
        ))}
        <Div forwardRef={endRef} />
      </Div>
      {paused && (
        <Div
          position="absolute"
          fx
          bottom={0}
          p={8}
          borderTop
          bg="brown-6"
        >
          <Button
            fx
            kind="secondary"
            size="sm"
            label="Chat Paused"
            labelSize={13}
            onClick={handleButtonClick}
          />
        </Div>
      )}
    </Div>
  );
};
