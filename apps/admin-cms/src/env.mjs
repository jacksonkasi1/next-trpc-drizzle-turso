//   ** Import Client **
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /*
   * ServerSide Environment variables, not available on the client.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),

  },
  /*
   * Environment variables available on the client (and server).
   */
  client: {

  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
});
