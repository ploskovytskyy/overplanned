import { v } from "convex/values";

import { mutation } from "./_generated/server";
import { ensureUserTrip } from "./_helpers/ensureUserTrip";
import { tripItemsModel } from "./_models/tripItems";

export const createTripItem = mutation({
  args: {
    tripId: v.string(),
    payload: v.object({
      title: tripItemsModel.fields.title,
      startDate: tripItemsModel.fields.startDate,
      endDate: tripItemsModel.fields.endDate,
      type: tripItemsModel.fields.type,
      url: tripItemsModel.fields.url,
    }),
  },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    await ctx.db.insert("tripItems", {
      trip: trip._id,
      title: args.payload.title,
      startDate: args.payload.startDate,
      endDate: args.payload.endDate,
      type: args.payload.type,
      url: args.payload.url,
    });
  },
});

export const updateTripItemDay = mutation({
  args: {
    tripId: v.string(),
    tripItemId: v.string(),
    newStartTime: v.string(),
    newEndTime: v.string(),
  },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    const tripItem = await ctx.db
      .query("tripItems")
      .withIndex("by_trip", (q) => q.eq("trip", trip._id))
      .filter((q) => q.eq(q.field("_id"), args.tripItemId))
      .unique();

    if (!tripItem) {
      throw new Error("Trip item not found");
    }

    await ctx.db.patch(tripItem._id, {
      startDate: args.newStartTime,
      endDate: args.newEndTime,
    });
  },
});

export const updateTripItem = mutation({
  args: {
    tripId: v.string(),
    tripItemId: v.string(),
    payload: v.object({
      title: tripItemsModel.fields.title,
      startDate: tripItemsModel.fields.startDate,
      endDate: tripItemsModel.fields.endDate,
      url: tripItemsModel.fields.url,
      type: tripItemsModel.fields.type,
    }),
  },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    const tripItem = await ctx.db
      .query("tripItems")
      .withIndex("by_trip", (q) => q.eq("trip", trip._id))
      .filter((q) => q.eq(q.field("_id"), args.tripItemId))
      .unique();

    if (!tripItem) {
      throw new Error("Trip item not found");
    }

    await ctx.db.patch(tripItem._id, {
      title: args.payload.title,
      startDate: args.payload.startDate,
      endDate: args.payload.endDate,
      url: args.payload.url,
      type: args.payload.type,
    });
  },
});

export const removeTripItem = mutation({
  args: {
    tripId: v.string(),
    tripItemId: v.string(),
  },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    const tripItem = await ctx.db
      .query("tripItems")
      .withIndex("by_trip", (q) => q.eq("trip", trip._id))
      .filter((q) => q.eq(q.field("_id"), args.tripItemId))
      .unique();

    if (!tripItem) {
      throw new Error("Trip item not found");
    }

    await ctx.db.delete(tripItem._id);
  },
});

export const duplicateTripItem = mutation({
  args: {
    tripId: v.string(),
    tripItemId: v.string(),
  },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    const tripItem = await ctx.db
      .query("tripItems")
      .withIndex("by_trip", (q) => q.eq("trip", trip._id))
      .filter((q) => q.eq(q.field("_id"), args.tripItemId))
      .unique();

    if (!tripItem) {
      throw new Error("Trip item not found");
    }

    const { _id, _creationTime, ...rest } = tripItem;

    await ctx.db.insert("tripItems", rest);
  },
});
