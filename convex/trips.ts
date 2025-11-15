import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { ensureUserTrip } from "./_helpers/ensureUserTrip";
import { tripsModel } from "./_models/trips";
import { ensureUserId } from "./_helpers/ensureUserId";

export const myTrips = query({
  handler: async (ctx) => {
    const user = await ensureUserId(ctx);

    const userTrips = await ctx.db
      .query("tripToUser")
      .withIndex("by_user", (q) => q.eq("user", user))
      .collect();

    const tripsWithDetails = await Promise.all(
      userTrips.map(({ trip }) => ctx.db.get(trip)),
    );

    return tripsWithDetails.filter((trip) => !!trip);
  },
});

export const createTrip = mutation({
  args: {
    name: tripsModel.fields.name,
    startDate: tripsModel.fields.startDate,
    endDate: tripsModel.fields.endDate,
    // minPeople: tripsModel.fields.minPeople,
    // maxPeople: tripsModel.fields.maxPeople,
  },
  handler: async (ctx, args) => {
    const user = await ensureUserId(ctx);

    const trip = await ctx.db.insert("trips", {
      name: args.name,
      startDate: args.startDate,
      endDate: args.endDate,
      // minPeople: args.minPeople,
      // maxPeople: args.maxPeople,
      currency: "USD",
    });

    await ctx.db.insert("tripToUser", { user, trip });

    return trip;
  },
});

export const getTripById = query({
  args: { tripId: v.string() },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    const tripItems = await ctx.db
      .query("tripItems")
      .withIndex("by_trip", (q) => q.eq("trip", trip._id))
      .collect();

    return { ...trip, items: tripItems };
  },
});
