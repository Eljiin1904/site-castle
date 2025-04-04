import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Chat } from "#app/services/chat";
import { useUsernames } from "../hooks/useUsernames";

export const MentionPopout = ({
  text,
  onMentionClick,
}: {
  text: string;
  onMentionClick: (newText: string) => void;
}) => {
  const usernames = useUsernames(text);

  const handleClick = (username: string) => {
    const mentions = Chat.parseMentions(text);

    const regex = new RegExp(`@${mentions[mentions.length - 1]}\\b`);
    const updatedText = text.replace(regex, `@${username} `);

    onMentionClick(updatedText);
  };

  const lastAtIndex = text.lastIndexOf("@");
  const lastSpaceIndex = text.lastIndexOf(" ");

  if (
    lastAtIndex === -1 ||
    lastAtIndex === text.length - 1 ||
    lastAtIndex <= lastSpaceIndex
  ) {
    return null;
  }

  return (
    <Div
      className="ChatModalBottom"
      fx
      column
      px={16}
      bg="brown-4"
      border
    >
      {usernames.map((username, i) => (
        <Div
          key={i}
          fx          
          py={16}
          hover="highlight"
          onClick={() => handleClick(username)}
          borderTop={i > 0 ? true : undefined}
          borderColor="dark-brown-hover"
        >
          <Span
            size={12}
          >
            {username}
          </Span>
        </Div>
      ))}
      {usernames.length === 0 && (
        <Div
          fx
          px={12}
          py={8}
          bg="brown-6"
        >
          <Span
            size={12}
            color="dark-gray"
          >
            {"No users found."}
          </Span>
        </Div>
      )}
    </Div>
  );
};
