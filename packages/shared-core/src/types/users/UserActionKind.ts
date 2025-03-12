import type { UserLinkProvider } from "./UserLinkProvider";

export type UserActionKind = UserActionKindData["kind"];

export type UserActionKindData =
  | ConfirmExclusionData
  | EmailEditData
  | ExtendExclusionData
  | LoginData
  | PasswordEditData
  | PasswordRecoverData
  | RegisterData
  | SetTradeUrlData
  | TfaDisableData
  | TfaEnableData;

interface ConfirmExclusionData {
  kind: "confirm-exclusion";
}

interface EmailEditData {
  kind: "email-edit";
  oldEmail: string;
  newEmail: string;
}

interface ExtendExclusionData {
  kind: "extend-exclusion";
  endDate: Date;
}

interface LoginData {
  kind: "login";
  strategy: "local" | UserLinkProvider;
  tfa?: boolean;
}

interface PasswordEditData {
  kind: "password-edit";
}

interface PasswordRecoverData {
  kind: "password-recover";
}

interface RegisterData {
  kind: "register";
  strategy: "local" | UserLinkProvider;
  email: string;
  steamId?: string;
  googleId?: string;
  discordId?: string;
  twitchId?: string;
}

interface SetTradeUrlData {
  kind: "set-trade-url";
  tradeUrl: string;
}

interface TfaDisableData {
  kind: "tfa-disable";
}

interface TfaEnableData {
  kind: "tfa-enable";
}
