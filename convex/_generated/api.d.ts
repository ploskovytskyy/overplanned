/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as _helpers_ensureUserId from "../_helpers/ensureUserId.js";
import type * as _helpers_ensureUserTrip from "../_helpers/ensureUserTrip.js";
import type * as _models_invites from "../_models/invites.js";
import type * as _models_tripItems from "../_models/tripItems.js";
import type * as _models_trips from "../_models/trips.js";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as invites from "../invites.js";
import type * as tripItems from "../tripItems.js";
import type * as trips from "../trips.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "_helpers/ensureUserId": typeof _helpers_ensureUserId;
  "_helpers/ensureUserTrip": typeof _helpers_ensureUserTrip;
  "_models/invites": typeof _models_invites;
  "_models/tripItems": typeof _models_tripItems;
  "_models/trips": typeof _models_trips;
  auth: typeof auth;
  http: typeof http;
  invites: typeof invites;
  tripItems: typeof tripItems;
  trips: typeof trips;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
