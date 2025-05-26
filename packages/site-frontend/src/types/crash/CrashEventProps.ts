export interface CrashEventProps {
  width?: number;
  crashLength: number;
  startedCrashLength: number;
  crashColor: "bright-green" | "double-red";
  startedLine?: boolean;
  crashPosition?: number;
  simulatingLine?: boolean;
  completedLine?: boolean;
};