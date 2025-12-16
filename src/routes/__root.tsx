import {
  HeadContent,
  Link,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { Image } from "@unpic/react";
import type { QueryClient } from "@tanstack/react-query";
import appCss from "@/styles.css?url";

import { Devtools } from "@/lib/devtools";
import { SignIn } from "@/components/sign-in";
import { Toaster } from "@/components/ui/sonner";

import logoImage from "@/assets/overplanned.png";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Overplanned" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-w-[375px]">
        <header className="border-b sticky top-0 bg-background z-10">
          <div className="h-16 container gap-4 grid grid-cols-[auto_1fr_1fr] md:grid-cols-3 items-center">
            <Link to="/" className="flex items-center gap-4">
              <Image
                src={logoImage}
                width={50}
                height={50}
                className="mix-blend-darken scale-125"
              />
              <span className="hidden md:block font-bold text-lg justify-self-start">
                overplanned
              </span>
            </Link>
            <nav className="flex md:justify-self-center items-center gap-5 md:gap-10">
              <Link
                to="/create"
                activeProps={{ className: "underline" }}
                className="shrink-0 hidden md:block"
              >
                Create trip
              </Link>
              <Link
                to="/trips"
                activeProps={{ className: "underline" }}
                className="shrink-0"
              >
                My trips
              </Link>
            </nav>
            <div className="justify-self-end">
              <SignIn />
            </div>
          </div>
        </header>
        <main>{children}</main>
        <Devtools />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}
