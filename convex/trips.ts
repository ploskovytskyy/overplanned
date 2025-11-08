import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const myTrips = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const userTrips = await ctx.db
      .query("tripToUser")
      .withIndex("by_user", (q) => q.eq("user", userId))
      .collect();

    const tripsWithDetails = await Promise.all(
      userTrips.map(({ trip }) => ctx.db.get(trip)),
    );

    return tripsWithDetails.filter((trip) => !!trip);
  },
});

export const createTrip = mutation({
  args: {
    name: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    minPeople: v.number(),
    maxPeople: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getAuthUserId(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    const trip = await ctx.db.insert("trips", {
      name: args.name,
      startDate: args.startDate,
      endDate: args.endDate,
      minPeople: args.minPeople,
      maxPeople: args.maxPeople,
      currency: "USD",
    });

    await ctx.db.insert("tripToUser", { user, trip });

    return trip;
  },
});

export const getTripById = query({
  args: { tripId: v.string() },
  handler: async (ctx, args) => {
    const user = await getAuthUserId(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    const userTrip = await ctx.db
      .query("tripToUser")
      .withIndex("by_user", (q) => q.eq("user", user))
      .filter((q) => q.eq(q.field("trip"), args.tripId))
      .first();

    if (!userTrip) {
      throw new Error("Trip not found for user");
    }

    const trip = await ctx.db.get(userTrip.trip);

    if (!trip) {
      throw new Error("Trip not found by id");
    }

    return trip;
  },
});
