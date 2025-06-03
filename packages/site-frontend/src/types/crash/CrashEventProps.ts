export interface CrashEventProps {
  width?: number;
  height: number;
  initialHeight: number;
  color: "bright-green" | "double-red";
  startAtLine?: boolean;
  position: number;
};