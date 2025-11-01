import Cookies from "js-cookie";
import type { TokenStorage } from "@convex-dev/auth/react";

export const authCookieFlagName = "__overplanned_authenticated";

export const authStorage: TokenStorage = {
  getItem: (key) => {
    return Cookies.get(key);
  },

  setItem: (key, value) => {
    Cookies.set(key, value);
    Cookies.set(authCookieFlagName, "1");
  },

  removeItem: (key) => {
    Cookies.remove(key);
    Cookies.remove(authCookieFlagName);
  },
};
