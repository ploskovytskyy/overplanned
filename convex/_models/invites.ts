import { v } from "convex/values";
import { tripToUserModel } from "./trips";

export const invitesModel = v.object({
  trip: v.id("trips"),
  initialRole: tripToUserModel.fields.role,
  user: v.optional(v.id("users")),
});
