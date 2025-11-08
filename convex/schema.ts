import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";

import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  trips: defineTable({
    name: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    minPeople: v.number(),
    maxPeople: v.number(),
    currency: v.string(),
  }),

  tripToUser: defineTable({
    trip: v.id("trips"),
    user: v.id("users"),
  }).index("by_user", ["user"]),
  tripItems: defineTable({
    trip: v.id("trips"),
    title: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    pricePerPerson: v.optional(v.number()),
    type: v.union(
      v.literal("transportation-plane"),
      v.literal("transportation-train"),
      v.literal("transportation-car"),
      v.literal("transportation-bus"),
      v.literal("accommodation-check-in"),
      v.literal("accommodation-check-out"),
      v.literal("entertainment"),
      v.literal("sightseeing"),
      v.literal("food"),
    ),
  }).index("by_trip", ["trip"]),
});
