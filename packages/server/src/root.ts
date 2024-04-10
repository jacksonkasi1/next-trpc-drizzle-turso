import { classRouter } from "./routers/class";
import { workshopRouter } from "./routers/workshop";

import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  class: classRouter,
  workshop: workshopRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
