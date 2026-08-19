import { type Context, type Middleware, type Next } from "@fastr/core";
import { ForbiddenError } from "@fastr/errors";
import { randomString, type SessionState } from "@fastr/middleware-session";
import { generateName } from "@keybr/names";
import { hashCode } from "@keybr/rand";
import { type AuthState } from "./types.ts";

export function loadUser(): Middleware<SessionState & AuthState> {
  return async (
    ctx: Context<SessionState & AuthState>,
    next: Next,
  ): Promise<void> => {
    const { state } = ctx;
    Object.assign(state, makeAuthState(state));
    await next();
  };
}

function makeAuthState(state: SessionState & AuthState): AuthState {
  const { session } = state;
  const sessionId = session.id ?? randomString(10);
  return {
    sessionId,
    user: null,
    publicUser: {
      id: null,
      name: generateName({ seed: hashCode(sessionId) || 1 }),
      imageUrl: null,
    },
    requireUser: () => {
      throw new ForbiddenError();
    },
  };
}
