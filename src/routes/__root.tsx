import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-eyebrow text-clay">Error 404</p>
        <h1 className="mt-6 text-display text-7xl text-ink">Not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for has drifted out of frame.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-xs font-medium tracking-widest uppercase text-cream transition-colors hover:bg-cocoa"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-4xl text-ink">Something went awry</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Please try again or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-widest text-cream hover:bg-cocoa"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-border bg-transparent px-6 py-3 text-xs uppercase tracking-widest text-ink hover:bg-sand"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Atelier — Architecture & Interior Design Studio" },
      {
        name: "description",
        content:
          "Luxury architecture and interiors designed with timeless elegance, thoughtful planning, and exceptional craftsmanship. A studio devoted to quiet luxury.",
      },
      { name: "author", content: "Atelier" },
      { name: "theme-color", content: "#f5f1e8" },
      { property: "og:title", content: "Atelier — Architecture & Interior Design Studio" },
      {
        property: "og:description",
        content:
          "Luxury architecture and interiors designed with timeless elegance, thoughtful planning, and exceptional craftsmanship. A studio devoted to quiet luxury.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Atelier — Architecture & Interior Design Studio" },
      {
        name: "twitter:description",
        content: "Luxury architecture and interiors designed with timeless elegance, thoughtful planning, and exceptional craftsmanship. A studio devoted to quiet luxury.",
      },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/66820156-7f4b-457c-9eaf-8b24777ebfa6" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/66820156-7f4b-457c-9eaf-8b24777ebfa6" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
