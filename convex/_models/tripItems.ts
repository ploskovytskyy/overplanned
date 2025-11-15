import { v } from "convex/values";

export const tripItemsModel = v.object({
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
    v.literal("activity"),
    v.literal("sightseeing"),
    v.literal("food"),
  ),
  url: v.optional(v.string()),
});
