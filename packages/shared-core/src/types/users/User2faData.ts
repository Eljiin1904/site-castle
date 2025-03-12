export type User2faData = {
  enabled?: boolean;
  secret?: string;
  recoveryHash?: string;
} & (
  | {
      enabled?: false | undefined;
    }
  | {
      enabled: true;
      secret: string;
      recoveryHash: string;
    }
);
