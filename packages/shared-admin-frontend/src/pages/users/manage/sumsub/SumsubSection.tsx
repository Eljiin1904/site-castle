import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Div } from "@client/comps/div/Div";

export const SumsubSection = ({
  heading,
  value,
}: {
  heading: string;
  value: string | number | JSX.Element;
}) => {
  return (
    <ModalSection>
      <ModalLabel>{heading}</ModalLabel>
      <Div>
        <Div
          grow
          align="center"
          px={12}
          fontSize={14}
          color="gray"
          bg="gray-8"
          border
          borderColor="gray-4"
          fontWeight="medium"
          height={36}
        >
          {value}
        </Div>
      </Div>
    </ModalSection>
  );
};
