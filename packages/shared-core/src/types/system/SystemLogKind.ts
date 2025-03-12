export type SystemLogKind = SystemLogKindData["kind"];

export type SystemLogKindData =
  | ClientErrorData
  | HttpErrorData
  | ServerErrorData
  | SocketErrorData;

interface ClientErrorData {
  kind: "client-error";
  ip: string | undefined;
  path: string;
  stack: string | undefined;
}

interface HttpErrorData {
  kind: "http-error";
  ip: string | undefined;
}

interface ServerErrorData {
  kind: "server-error";
}

interface SocketErrorData {
  kind: "socket-error";
  ip: string | undefined;
}
