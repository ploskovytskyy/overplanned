import { v } from "convex/values";

import { mutation } from "./_generated/server";
import { ensureUserTrip } from "./_helpers/ensureUserTrip";
import { tripItemsModel } from "./_models/tripItems";

export const createTripItem = mutation({
  args: {
    tripId: v.id("trips"),
    payload: v.object({
      title: tripItemsModel.fields.title,
    }),
  },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    // const tripItem = await ctx.db.insert("tripItems", {
    //   trip: trip._id,
    //   title: args.payload.title,
    // });

    // return tripItem.id;
  },
});
