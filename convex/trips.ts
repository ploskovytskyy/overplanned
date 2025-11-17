import { ConvexError, v } from "convex/values";

import { getRandomColor } from "../src/lib/colors";
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

    await ctx.db.insert("tripToUser", {
      user,
      trip,
      role: "owner",
      color: getRandomColor(),
    });

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

export const updateTrip = mutation({
  args: {
    tripId: v.string(),
    payload: v.object({
      name: tripsModel.fields.name,
      startDate: tripsModel.fields.startDate,
      endDate: tripsModel.fields.endDate,
    }),
  },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    await ctx.db.patch(trip._id, {
      name: args.payload.name,
      startDate: args.payload.startDate,
      endDate: args.payload.endDate,
    });
  },
});

export const members = query({
  args: { tripId: v.string() },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    const tripToUsers = await ctx.db
      .query("tripToUser")
      .filter((q) => q.eq(q.field("trip"), trip._id))
      .collect();

    const users = await Promise.all(
      tripToUsers.map((member) => ctx.db.get(member.user)),
    );

    const membersData = tripToUsers.flatMap((member) => {
      const user = users.find((userData) => userData?._id === member.user);

      if (!user) return [];

      return [
        {
          id: member.user,
          membershipId: member._id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: member.role,
          color: member.color,
        },
      ];
    });

    return membersData;
  },
});
