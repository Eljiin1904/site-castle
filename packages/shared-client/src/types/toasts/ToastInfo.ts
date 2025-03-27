export interface ToastInfo {
  kind: "info" | "success" | "warning" | "error";
  text: string;
  duration: number;
  timestamp: Date;
  data?: any;
}
