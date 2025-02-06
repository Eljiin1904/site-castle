import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { CardSection } from "@client/comps/cards/CardSection";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";

export const UserSlide = ({
  icon,
  heading,
  description,
  descriptionColor = "gray",
  successMessage,
  buttonKind = "primary",
  buttonLabel,
  buttonLoading,
  buttonDisabled,
  onButtonClick,
}: {
  icon: Svg;
  heading: string;
  description: string | JSX.Element;
  descriptionColor?: Color;
  successMessage?: string;
  buttonKind?: "primary" | "secondary";
  buttonLabel: string;
  buttonLoading?: boolean;
  buttonDisabled?: boolean;
  onButtonClick: () => void;
}) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const small = mainLayout === "mobile";

  return (
    <CardSection
      py={16}
      gap={small ? 12 : 16}
    >
      <Vector
        as={icon}
        size={24}
      />
      <Div
        grow
        column
        gap={6}
      >
        <Span
          family="title"
          weight="bold"
          color="white"
          size={small ? 14 : 16}
        >
          {heading}
        </Span>
        <Div
          display="block"
          fontSize={small ? 12 : 14}
          color={descriptionColor}
        >
          {description}
        </Div>
      </Div>
      {successMessage && (
        <Div align="center">
          <Vector
            as={SvgCheckCircle}
            size={16}
            color="green"
          />
          {!small && (
            <Span
              weight="semi-bold"
              color="green"
              ml={6}
              mr={8}
            >
              {successMessage}
            </Span>
          )}
        </Div>
      )}
      <Div align="center">
        <Button
          kind={buttonKind}
          label={buttonLabel}
          labelSize={small ? 12 : 14}
          loading={buttonLoading}
          disabled={buttonDisabled}
          style={{
            minWidth: small ? "64px" : "80px",
            maxWidth: small ? "64px" : "80px",
            height: small ? "36px" : "40px",
          }}
          onClick={onButtonClick}
        />
      </Div>
    </CardSection>
  );
};
