import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Link } from "@client/comps/link/Link";
import { Chat } from "#app/services/chat";
import { Img } from "@client/comps/img/Img";

export const TextContent = ({ text, isReply = false }: { text: string , isReply?: boolean}) => {
  if (Chat.containsBadWord(text)) {
    return (
      <Span
        size={12}
        color="dark-gray"
      >
        {"Message censored by auto-moderator."}
      </Span>
    );
  } else if (text.length === 2 && /\p{Extended_Pictographic}/u.test(text)) {
    return <Span size={18}>{text}</Span>;
  }
  return (
    <RichText
      fontSize={12}
      color="light-sand"
      text={text}
      isReply={isReply}
    />
  );
};

const RichText = ({
  fontSize,
  color,
  text,
  isReply = false,
}: {
  fontSize: Unit;
  color: Color;
  text: string;
  isReply?: boolean;
}) => {
  const span: string[] = [];
  const elements = [];

  const endSpan = (last: boolean) => {
    if (span.length > 0) {
      elements.push(
        <Span
          key={elements.length}
          size={fontSize}
          color={color}
        >
          {elements.length > 0 && " "}
          {span.join(" ")}
          {!last && " "}
        </Span>,
      );
      span.length = 0;
    }
  };
  
  for (const str of text.split(" ")) {
    if (
      str.startsWith("http://") ||
      str.startsWith("https://") ||
      str.startsWith("www.")
    ) {
      endSpan(false);
      elements.push(
        <Span
          key={elements.length}
          size={fontSize}
          color="dark-gray"
        >
          {"[removed]"}
        </Span>,
      );
    } else if (str.startsWith("/") && str.length > 1) {
      endSpan(false);
      elements.push(
        <Link
          key={elements.length}
          type="router"
          to={str}
          fontSize={fontSize}
          color="sand"
          fontWeight="medium"
          textDecoration="underline"
        >
          {str}
        </Link>,
      );
    } else if (str.startsWith("@") && str.length > 1) {
      endSpan(false);
      elements.push(
        <Span
          key={elements.length}
          size={fontSize}
          color="sand"
        >
          {str}
        </Span>,
      );
    } else if(str.startsWith("[:") && str.length > 1) {

      const emojiId = str.substring(1, str.length - 1);
      const emote = Chat.emotes.find((x) => x.id === emojiId);
      if(!emote)
        span.push(str);
      else {
        endSpan(false);
        elements.push(
          <Img key={elements.length} path={emote.src} height={isReply ? "16px":"32px"} width={isReply ? "16px":"32px"} type="png" alt={emote.name} />,
        );
      }
    } else if(str.startsWith("[giphy:") && str.length > 1) {

      const gifData = str.substring(7, str.length - 1);
      endSpan(false);
      elements.push(
        <Img key={elements.length} path={gifData} width={isReply ? "32px":"240px"} type="external" alt="Image from giphy" />,
      );
    }
    else {
      elements.push(<Span key={elements.length} size={isReply ? 10: 12} color={color}>{str}</Span>);
    }
  }

  endSpan(true);

  return (
    <Div
      className="rich-text"
      display="flex"
      alignItems="flex-end"
      wrap
      gap={4}
    >
      {elements.map((x) => x)}
    </Div>
  );
};
