import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import type { QueryCtx } from "../_generated/server";

export async function ensureUserId(ctx: QueryCtx) {
  const user = await getAuthUserId(ctx);

  if (!user) {
    throw new ConvexError("Unauthorized");
  }

  return user;
}
