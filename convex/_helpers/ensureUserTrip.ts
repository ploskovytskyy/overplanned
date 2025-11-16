import { getAuthUserId } from "@convex-dev/auth/server";
import type { QueryCtx } from "../_generated/server";

export async function ensureUserTrip(ctx: QueryCtx, tripId: string) {
  const user = await getAuthUserId(ctx);

  if (!user) {
    throw new Error("User not authenticated");
  }

  const userTrip = await ctx.db
    .query("tripToUser")
    .withIndex("by_user", (q) => q.eq("user", user))
    .filter((q) => q.eq(q.field("trip"), tripId))
    .first();

  if (!userTrip) {
    throw new Error("Trip not found for user");
  }

  const trip = await ctx.db.get(userTrip.trip);

  if (!trip) {
    throw new Error("Trip not found by id");
  }

  return { ...trip, role: userTrip.role };
}
