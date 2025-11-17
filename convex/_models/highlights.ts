import { v } from "convex/values";

export const highlightsModel = v.object({
  trip: v.id("trips"),
  membership: v.id("tripToUser"),
  dayKey: v.optional(v.string()),
  dayItem: v.optional(v.string()),
  element: v.union(v.literal("day_card"), v.literal("day_item")),
});
