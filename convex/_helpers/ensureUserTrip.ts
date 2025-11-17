import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import type { QueryCtx } from "../_generated/server";

export async function ensureUserTrip(ctx: QueryCtx, tripId: string) {
  const user = await getAuthUserId(ctx);

  if (!user) {
    throw new ConvexError("Unauthorized");
  }

  const userTrip = await ctx.db
    .query("tripToUser")
    .withIndex("by_user", (q) => q.eq("user", user))
    .filter((q) => q.eq(q.field("trip"), tripId))
    .first();

  if (!userTrip) {
    throw new ConvexError("Unauthorized");
  }

  const trip = await ctx.db.get(userTrip.trip);

  if (!trip) {
    throw new ConvexError("NotFound");
  }

  return { ...trip, role: userTrip.role, membershipId: userTrip._id };
}
