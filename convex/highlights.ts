import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ensureUserTrip } from "./_helpers/ensureUserTrip";
import { highlightsModel } from "./_models/highlights";

export const getHighlights = query({
  args: { tripId: v.string() },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    const highlights = await ctx.db
      .query("highlights")
      .withIndex("by_trip", (q) => q.eq("trip", trip._id))
      .filter((q) => q.neq(q.field("membership"), trip.membershipId))
      .collect();

    return highlights;
  },
});

export const createHighlight = mutation({
  args: {
    tripId: v.string(),
    payload: v.object({
      element: highlightsModel.fields.element,
      dayKey: highlightsModel.fields.dayKey,
      dayItem: highlightsModel.fields.dayItem,
    }),
  },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    await ctx.db.insert("highlights", {
      trip: trip._id,
      membership: trip.membershipId,
      element: args.payload.element,
      dayKey: args.payload.dayKey,
      dayItem: args.payload.dayItem,
    });
  },
});

export const deleteHighlight = mutation({
  args: {
    tripId: v.string(),
    payload: v.object({
      dayKey: highlightsModel.fields.dayKey,
      dayItem: highlightsModel.fields.dayItem,
    }),
  },
  handler: async (ctx, args) => {
    if (!args.payload.dayItem && !args.payload.dayKey) {
      throw new Error("Invalid payload");
    }

    const trip = await ensureUserTrip(ctx, args.tripId);

    const highlights = await ctx.db
      .query("highlights")
      .withIndex("by_trip", (q) => q.eq("trip", trip._id))
      .filter((q) =>
        q.and(
          q.eq(q.field("membership"), trip.membershipId),
          q.or(
            ...(args.payload.dayKey
              ? [q.eq(q.field("dayKey"), args.payload.dayKey)]
              : []),
            ...(args.payload.dayItem
              ? [q.eq(q.field("dayItem"), args.payload.dayItem)]
              : []),
          ),
        ),
      )
      .collect();

    if (!highlights.length) {
      throw new Error("Highlights not found");
    }

    await Promise.all(
      highlights.map((highlight) => ctx.db.delete(highlight._id)),
    );
  },
});
