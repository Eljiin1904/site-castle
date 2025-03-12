import { Div } from "../div/Div";
import { Spinner } from "../spinner/Spinner";

export const ModalLoading = () => {
  return (
    <Div
      center
      py={64}
    >
      <Spinner size={64} />
    </Div>
  );
};
