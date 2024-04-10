

//  ** Import Core Packages ** 
import { cookies } from "next/headers";

//  ** Import Sub Pages / Section ** 
import { getUrl, transformer } from "./shared";

//  ** import Types ** 
import { type AppRouter } from "@repo/server";


//  ** Import apis ** 
import {
  createTRPCProxyClient,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    unstable_httpBatchStreamLink({
      url: getUrl(),
      headers() {
        return {
          cookie: cookies().toString(),
          "x-trpc-source": "rsc",
        };
      },
    }),
  ],
});