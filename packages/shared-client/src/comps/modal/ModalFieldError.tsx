import { Span } from "../span/Span";
import "./ModalFieldError.scss";

export const ModalFieldError = ({ error }: { error: string | undefined }) =>
  error && (
    <Span
      className="error-text"
      fontSize={12}
    >
      {error}
    </Span>
  );
