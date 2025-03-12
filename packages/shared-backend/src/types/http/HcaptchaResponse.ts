// https://docs.hcaptcha.com/#verify-the-user-response-server-side

export interface HcaptchaResponse {
  success: boolean; // is the passcode valid, and does it meet security criteria you specified, e.g. sitekey?
  challenge_ts: string; // timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string; // the hostname of the site where the challenge was solved
  "error-codes": string[]; // optional: any error codes
  score: number; // ENTERPRISE feature: a score denoting malicious activity.
  score_reason: string[]; // ENTERPRISE feature: reason(s) for score.
}
