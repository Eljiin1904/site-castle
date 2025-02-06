import { Div } from "@client/comps/div/Div";
import { ProgressBar } from "@client/comps/progress-bar/ProgressBar";
import { Span } from "@client/comps/span/Span";

export const StatusBar = ({
  label,
  progress,
}: {
  label: string;
  progress: number;
}) => {
  return (
    <Div
      fx
      column
      gap={12}
      py={16}
      borderBottom
      borderTop
    >
      <Span
        color="white"
        textAlign="center"
        family="title"
        textTransform="uppercase"
        weight="bold"
        size={12}
      >
        {label}
      </Span>
      <ProgressBar
        progress={progress}
        height={8}
        fillColor="gold"
      />
    </Div>
  );
};
