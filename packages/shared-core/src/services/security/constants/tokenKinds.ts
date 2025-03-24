import { TokenKind } from "#core/types/security/TokenKind";

const kindMap: Record<TokenKind, boolean> = {
  "email-confirm": true,
  "exclude-confirm": true,
  "link-discord": true,
  "link-google": true,
  "link-siwe": true,
  "link-steam": true,
  "link-twitch": true,
  "otp-action": true,
  "otp-login": true,
  "password-recover": true,
};

export const tokenKinds = Object.keys(kindMap) as TokenKind[];
