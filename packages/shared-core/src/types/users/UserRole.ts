import type { roles } from "#core/services/users/Users";

export type UserRole = (typeof roles)[number];
