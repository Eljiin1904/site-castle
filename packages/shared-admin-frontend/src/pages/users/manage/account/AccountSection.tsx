import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Div } from "@client/comps/div/Div";
import { SvgEdit } from "@client/svgs/common/SvgEdit";
import { Button } from "@client/comps/button/Button";

export const AccountSection = ({
  heading,
  value,
  onEditClick,
  icon = SvgEdit,
  btnTitle,
}: {
  heading: string;
  value: string | number | JSX.Element;
  onEditClick?: () => void;
  icon?: Svg;
  btnTitle?: string;
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
          bg="brown-8"
          border
          borderColor="brown-4"
          fontWeight="medium"
          height={36}
        >
          {value}
        </Div>
        {onEditClick && (
          <Button
            kind="secondary"
            size="sm"
            onClick={onEditClick}
            icon={icon}
            title={btnTitle ?? "Edit"}
          />
        )}
      </Div>
    </ModalSection>
  );
};
