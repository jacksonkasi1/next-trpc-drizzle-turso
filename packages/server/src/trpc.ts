/**
 *  @see: https://discord.com/channels/856971667393609759/1193339581551104081
 */

import { NextRequest } from "next/server";

import { initTRPC } from "@trpc/server";

import superjson from "superjson";
import { ZodError } from "zod";

// import jwk from "../jwk.json";

// Defines the structure for context options.
interface CreateContextOptions {
  headers: Headers;
}

// Generates the context for tRPC, including session data.
export const createInnerTRPCContext = (opts: CreateContextOptions) => ({
  headers: opts.headers,
});

// Verifies the session JWT and creates the context.
export const createTRPCContext = async (opts: { req: NextRequest }) => {
  const sessionToken = opts.req.cookies.get("__session")?.value ?? "";

  try {
    return createInnerTRPCContext({
      headers: opts.req.headers,
    });
  } catch (error) {
    // console.error("❌ Error verifying JWT:", error);
    return createInnerTRPCContext({ headers: opts.req.headers });
  }
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Initializes tRPC router and procedures.
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
