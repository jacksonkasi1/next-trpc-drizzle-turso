import { db } from "@repo/db";
import { tbl_classes } from "@repo/db/src/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { env } from "../config";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const classRouter = createTRPCRouter({
  add: publicProcedure
    .input(createSelectSchema(tbl_classes))
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      try {
        const classData = await db
          .insert(tbl_classes)
          .values({
            class_id: input.class_id,
            class_name: input.class_name,
            description: input.description,
            list: input.list,
            offer_price: input.offer_price,
            regular_price: input.regular_price,
            mode: input.mode,
            plan: input.plan,
            days: input.days,
            timings: input.timings,
            eligibility: input.eligibility,
            thumbnail: input.thumbnail,
          })
          .returning();
        return {
          success: true,
          message: "Successfully created class",
          data: classData[0],
        };
      } catch (error: any) {
        console.log(error.message);
        return {
          success: false,
          message: "Error to fetch API",
        };
      }
    }),

  get: publicProcedure
    .input(
      z.object({ limit: z.number().default(10), page: z.number().default(0) })
    )
    .query(async ({ ctx, input }) => {
      try {
        const classData = await db.query.tbl_users.findMany({
          limit: input.limit,
          offset: input.page * input.limit,
        });
        return {
          success: true,
          message: "Successfully fetched class",
          data: classData,
        };
      } catch (error: any) {
        console.log(error.message);
        return {
          success: false,
          message: `Error to fetch API
        ${env.NODE_ENV !== "production" ? `${error.message}` : ""} `,
        };
      }
    }),
});
