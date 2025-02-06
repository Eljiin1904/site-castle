import { Span } from "@client/comps/span/Span";
import { Link } from "@client/comps/link/Link";
import { Double } from "#app/services/double";

export const DoubleStreakContent = ({
  streakKind,
  streakCount,
}: {
  streakKind: "green" | "bait";
  streakCount: number;
}) => {
  const multiplier = Double.getMultiplierFromBetKind(streakKind);

  return (
    <Link
      type="router"
      to="/double"
      hover="none"
      display="block"
    >
      <Span
        size={13}
        color="white"
      >
        {`${streakCount} rounds`}
      </Span>
      <Span size={13}>{" since the last "}</Span>
      <Span
        size={13}
        color="white"
      >
        {`${multiplier}x`}
      </Span>
      <Span size={13}>{" in "}</Span>
      <Span
        size={13}
        color="white"
      >
        {"Double"}
      </Span>
      <Span size={13}>{"!"}</Span>
    </Link>
  );
};
