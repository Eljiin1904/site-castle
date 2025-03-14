import { Div } from "@client/comps/div/Div";
import { ChatFooterField } from "./ChatFooterField";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import "./ChatFooter.scss";

export const ChatFooter = () => {

  const small = useIsMobileLayout();
  return (
    <Div
      className="ChatFooter"
      column
      py={14}
      px={small? 20: 24}
      gap={8}
      borderTop
      borderColor="brown-4"
    >
      <ChatFooterField />
    </Div>
  );
};
