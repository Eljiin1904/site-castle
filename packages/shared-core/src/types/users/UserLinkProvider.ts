import type { linkProviders } from "#core/services/users/Users";

export type UserLinkProvider = (typeof linkProviders)[number];
