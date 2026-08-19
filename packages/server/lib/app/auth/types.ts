import { type AnyUser } from "@keybr/pages-shared";

export type AuthState = {
  readonly sessionId: string;
  readonly user: null;
  readonly publicUser: AnyUser;
  readonly requireUser: () => never;
};
