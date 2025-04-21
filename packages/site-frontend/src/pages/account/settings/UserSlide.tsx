import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { CardSection } from "@client/comps/cards/CardSection";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { Heading } from "@client/comps/heading/Heading";

export const UserSlide = ({
  id,
  heading,
  description,
  descriptionColor = "gray",
  successMessage,
  buttonKind = "primary-yellow",
  buttonLabel,
  buttonLoading,
  buttonDisabled,
  onButtonClick,
  borderBottom = true,
  extraContent = null,
}: {
  id: string;
  heading: string;
  description: string | JSX.Element;
  descriptionColor?: Color;
  successMessage?: string;
  buttonKind?: "primary-yellow" | "tertiary-grey";
  buttonLabel: string;
  buttonLoading?: boolean;
  buttonDisabled?: boolean;
  borderBottom?: boolean;
  onButtonClick: () => void;
  extraContent?: JSX.Element | null;
}) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const small = mainLayout === "mobile";

  return (
    <CardSection  px={small ? 20 : 24} py={0} position="none" column={!!extraContent}> 
    <Div fx py={16} borderBottom={!extraContent} borderColor="brown-4" justify="space-between" center>
      <Div column gap={8} className="toggle-slide">
        <Heading as="h3" fontWeight="regular" textTransform="uppercase">
          {heading}
        </Heading>
        <Span className="description-text">
          {description}
        </Span>
        {successMessage && (
          <Div align="center">
            <Vector
              as={SvgCheckCircle}
              size={16}
              color="bright-green"
            />
            {!small && (
              <Span
                color="bright-green"
                ml={8}
              >
                {successMessage}
              </Span>
            )}
          </Div>
        )}
        </Div>
        <Button
          kind={buttonKind}
          label={buttonLabel}
          labelSize={small ? 12 : 14}
          loading={buttonLoading}
          disabled={buttonDisabled}
          style={{
            minWidth: small ? "64px" : "100px"
          }}
          onClick={onButtonClick}
        />
    </Div>
    {extraContent && (
      <Div
        className="extra-content"
        pb={16} 
        borderBottom
        borderColor="brown-4"
      >
        {extraContent}
      </Div>
    )}
    </CardSection>
  );
};
