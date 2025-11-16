import { v } from "convex/values";

export const tripsModel = v.object({
  name: v.string(),
  startDate: v.string(),
  endDate: v.string(),
  minPeople: v.optional(v.number()),
  maxPeople: v.optional(v.number()),
  currency: v.string(),
});

export const tripToUserModel = v.object({
  trip: v.id("trips"),
  user: v.id("users"),
  role: v.union(v.literal("owner"), v.literal("admin"), v.literal("member")),
});
