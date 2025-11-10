import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";

import { tripToUserModel, tripsModel } from "./_models/trips";
import { tripItemsModel } from "./_models/tripItems";

export default defineSchema({
  ...authTables,
  trips: defineTable(tripsModel),
  tripToUser: defineTable(tripToUserModel).index("by_user", ["user"]),
  tripItems: defineTable(tripItemsModel).index("by_trip", ["trip"]),
});
