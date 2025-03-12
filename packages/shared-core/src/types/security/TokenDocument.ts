import type { TokenKind, TokenKindData } from "./TokenKind";

export type TokenDocument = {
  _id: string;
  timestamp: Date;
  kind: TokenKind;
  token: string;
  expires: Date;
} & TokenKindData;
