import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";

export const StatSlide = ({
  label,
  tip,
  tokens,
  count,
}: {
  label: string;
  tip?: string;
  tokens?: number;
  count?: number;
}) => {
  return (
    <Div
      fx
      px={16}
      py={14}
      bg="brown-7"
      data-tooltip-id="app-tooltip"
      data-tooltip-content={tip}
      hover="highlight"
    >
      <Div
        grow
        gap={6}
      >
        <Span>{label}</Span>
      </Div>
      {tokens !== undefined && <Tokens value={tokens} />}
      {count !== undefined && (
        <Span
          family="title"
          weight="bold"
          color="white"
        >
          {Numbers.toLocaleString(count, 0)}
        </Span>
      )}
    </Div>
  );
};
