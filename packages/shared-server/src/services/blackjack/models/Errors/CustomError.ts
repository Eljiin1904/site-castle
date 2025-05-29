export type CustomErrorArg = {
  error?: unknown;
  data?: any;
  friendly?: string;
};

export class CustomError extends Error {
  private friendly?: string;
  private data?: any;
  private errorCause?: CustomError | Error;

  constructor(message: string, arg: CustomErrorArg = {}) {
    let addedMessage = "";
    if (arg.error && arg.error instanceof Error) {
      addedMessage = ` : ${arg.error.message}`;
    }
    super(message + addedMessage);
    this.name = "CustomError";

    this.friendly = arg.friendly || "Something went wrong";
    this.data = arg.data;
    if (arg.error instanceof Error) this.errorCause = arg.error;
  }

  override toString() {
    const strAr = [this.message];
    if (this.data) strAr.push(JSON.stringify(this.data));
    if (this.errorCause) strAr.push(`Caused by: ${this.errorCause.toString()}`);
    return strAr.join("\n");
  }

  toObj() {
    const cause = this.errorCause;
    const obj: any = {
      message: this.message,
      data: this.data,
      stack: this.stack,
      cause: cause
        ? cause instanceof CustomError
          ? cause.toObj()
          : { message: cause.message, stack: cause.stack }
        : undefined,
    };
    return obj;
  }
}
