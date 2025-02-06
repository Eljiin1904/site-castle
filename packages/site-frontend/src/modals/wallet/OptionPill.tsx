import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import "./OptionPill.scss";

export const OptionPill = ({
  icon,
  label,
  hidden,
  disabled,
  pill,
  description,
  onClick,
}: {
  icon: JSX.Element;
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  description?: string;
  pill?: string;
  onClick?: () => void;
}) => {
  if (hidden) {
    return null;
  }
  return (
    <Div
      className="OptionPill"
      align="center"
      gap={12}
      bg="brown-6"
      border
      hover="highlight"
      onClick={disabled ? undefined : onClick}
      data-tooltip-id={disabled ? "app-tooltip" : undefined}
      data-tooltip-content={disabled ? "Coming Soon" : undefined}
    >
      <Div
        className="icon-box"
        center
        fy
        bg="brown-8"
      >
        {icon}
      </Div>
      <Div
        column
        gap={6}
      >
        <Div
          align="center"
          gap={6}
        >
          <Span
            weight="semi-bold"
            color="white"
          >
            {label}
          </Span>
          {pill && (
            <Div
              px={4}
              py={1}
              bg="gold"
              borderRadius={4}
            >
              <Span
                family="title"
                weight="bold"
                fontSize={12}
                color="black"
              >
                {pill}
              </Span>
            </Div>
          )}
        </Div>
        {description && (
          <Span
            weight="medium"
            fontSize={12}
          >
            {description}
          </Span>
        )}
      </Div>
    </Div>
  );
};
