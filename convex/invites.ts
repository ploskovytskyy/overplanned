import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ensureUserTrip } from "./_helpers/ensureUserTrip";
import { ensureUserId } from "./_helpers/ensureUserId";

export const getTripInvites = query({
  args: { tripId: v.string() },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);
    const invites = await ctx.db
      .query("invites")
      .withIndex("by_trip", (q) => q.eq("trip", trip._id))
      .collect();
    return invites;
  },
});

export const createUrlInvite = mutation({
  args: { tripId: v.string() },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);
    const invite = await ctx.db.insert("invites", {
      trip: trip._id,
      initialRole: "member",
    });
    return invite;
  },
});

export const acceptInvite = mutation({
  args: { inviteId: v.id("invites") },
  handler: async (ctx, args) => {
    const user = await ensureUserId(ctx);

    const invite = await ctx.db.get(args.inviteId);

    if (!invite || (invite.user && invite.user !== user)) {
      throw new Error("Invite not found");
    }

    const userToTrip = await ctx.db
      .query("tripToUser")
      .withIndex("by_user", (q) => q.eq("user", user))
      .filter((q) => q.eq(q.field("trip"), invite.trip))
      .unique();

    if (userToTrip) {
      throw new Error("User already in trip");
    }

    await ctx.db.insert("tripToUser", {
      user,
      trip: invite.trip,
      role: invite.initialRole,
    });

    if (invite.user) {
      await ctx.db.delete(invite._id);
    }
  },
});

export const revokeInvite = mutation({
  args: { tripId: v.string(), inviteUrl: v.id("invites") },
  handler: async (ctx, args) => {
    const trip = await ensureUserTrip(ctx, args.tripId);

    if (trip.role !== "owner" && trip.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.inviteUrl);
  },
});

export const getInviteData = query({
  args: { inviteId: v.id("invites") },
  handler: async (ctx, args) => {
    const user = await ensureUserId(ctx);
    const invite = await ctx.db.get(args.inviteId);

    if (!invite || (invite.user && invite.user !== user)) {
      throw new Error("Invite not found");
    }

    const trip = await ctx.db.get(invite.trip);

    if (!trip) {
      throw new Error("Trip not found");
    }

    const userToTrip = await ctx.db
      .query("tripToUser")
      .withIndex("by_user", (q) => q.eq("user", user))
      .filter((q) => q.eq(q.field("trip"), invite.trip))
      .unique();

    if (userToTrip) {
      return {
        accepted: true,
        tripData: trip,
        inviteData: null,
      };
    }

    return {
      accepted: false,
      tripData: trip,
      inviteData: invite,
    };
  },
});
