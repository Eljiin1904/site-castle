import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Link } from "@client/comps/link/Link";
import { Chat } from "#app/services/chat";

export const TextContent = ({ text }: { text: string }) => {
  if (Chat.containsBadWord(text)) {
    return (
      <Span
        size={13}
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
      fontSize={13}
      color="gray"
      text={text}
    />
  );
};

const RichText = ({
  fontSize,
  color,
  text,
}: {
  fontSize: Unit;
  color: Color;
  text: string;
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
          color="light-blue"
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
          color="light-orange"
        >
          {str}
        </Span>,
      );
    } else {
      span.push(str);
    }
  }

  endSpan(true);

  return (
    <Div
      className="rich-text"
      display="block"
    >
      {elements.map((x) => x)}
    </Div>
  );
};
