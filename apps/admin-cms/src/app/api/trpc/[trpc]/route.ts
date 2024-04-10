//  ** Import Core Packages **
import { NextRequest } from "next/server";

//  ** Import Apis **
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

//  ** Import Server **
import { appRouter } from "@repo/server";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({ headers: req.headers }),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
