

//   ** Import Assets ** 
import superjson from "superjson";
export const transformer = superjson;

//  ** Import Core Packages **
function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
// ** Import Types ** 
import { type AppRouter } from "@repo/server";

//  ** Import Trpc ** 
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";




export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;