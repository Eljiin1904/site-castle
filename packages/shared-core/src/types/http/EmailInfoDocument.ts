// https://hunter.io/api-documentation/v2#email-verifier

export interface EmailInfoDocument {
  _id: string;
  email: string;
  timestamp: Date;
  status:
    | "valid"
    | "invalid"
    | "accept_all"
    | "webmail"
    | "disposable"
    | "unknown";
  result: "deliverable" | "undeliverable" | "risky";
  score: number;
  regexp: boolean;
  gibberish: boolean;
  disposable: boolean;
  webmail: boolean;
  mx_records: boolean;
  smtp_server: boolean;
  smtp_check: boolean;
  accept_all: boolean;
  block: boolean;
}
