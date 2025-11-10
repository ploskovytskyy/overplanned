import { getAuthUserId } from "@convex-dev/auth/server";
import type { QueryCtx } from "../_generated/server";

export async function ensureUserId(ctx: QueryCtx) {
  const user = await getAuthUserId(ctx);

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
