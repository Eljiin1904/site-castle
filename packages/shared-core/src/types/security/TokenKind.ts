import type { UserLinkProvider } from "../users/UserLinkProvider";

export type TokenKind = TokenKindData["kind"];

export type TokenKindData =
  | EmailConfirmData
  | ExcludeConfirmData
  | LinkDiscordData
  | LinkGoogleData
  | LinkSiweData
  | LinkSteamData
  | LinkTwitchData
  | OtpActionData
  | OtpLoginData
  | PasswordRecoverData;

interface EmailConfirmData {
  kind: "email-confirm";
  userId: string;
  email: string;
}

interface ExcludeConfirmData {
  kind: "exclude-confirm";
  userId: string;
}

interface LinkDiscordData {
  kind: "link-discord";
  discordId: string;
  email: string;
}

interface LinkGoogleData {
  kind: "link-google";
  googleId: string;
  email: string;
}

interface LinkSiweData {
  kind: "link-siwe";
  address: string;
}

interface LinkSteamData {
  kind: "link-steam";
  steamId: string;
}

interface LinkTwitchData {
  kind: "link-twitch";
  twitchId: string;
  email: string;
}

interface OtpActionData {
  kind: "otp-action";
  userId: string;
}

interface OtpLoginData {
  kind: "otp-login";
  userId: string;
  strategy: "local" | UserLinkProvider;
}

interface PasswordRecoverData {
  kind: "password-recover";
  userId: string;
}
