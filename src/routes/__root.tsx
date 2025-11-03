import {
  HeadContent,
  Link,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";
import appCss from "@/styles.css?url";

import { Devtools } from "@/lib/devtools";
import { SignIn } from "@/components/sign-in";

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
      <body>
        <header className="border-b">
          <div className="h-16 container grid grid-cols-3 items-center">
            <span className="font-bold text-lg justify-self-start">
              overplanned
            </span>
            <nav className="flex justify-self-center items-center gap-10">
              <Link to="/" activeProps={{ className: "underline" }}>
                Home
              </Link>
              <Link to="/trips" activeProps={{ className: "underline" }}>
                My trips
              </Link>
            </nav>
            <div className="justify-self-end">
              <SignIn />
            </div>
          </div>
        </header>
        <main className="py-4">{children}</main>
        <Devtools />
        <Scripts />
      </body>
    </html>
  );
}
