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
    });
  },
});
