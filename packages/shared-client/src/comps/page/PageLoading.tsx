import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { Spinner } from "../spinner/Spinner";
import "./PageLoading.scss";

export const PageLoading = ({ message }: { message?: string }) => {
  return (
    <Div
      className="PageLoading"
      column
      center
      grow
      gap={16}
    >
      <Spinner size={80} />
      {message && <Span>{message}</Span>}
    </Div>
  );
};
