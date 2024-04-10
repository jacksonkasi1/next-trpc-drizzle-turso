import { db, eq } from "@repo/db";
import { tbl_workshops } from "@repo/db/src/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const workshopRouter = createTRPCRouter({
  add: publicProcedure
    .input(createSelectSchema(tbl_workshops))
    .mutation(async ({ ctx, input }) => {
      console.log("✅", input);
      try {
        const classData = await db
          .insert(tbl_workshops)
          .values({
            workshop_title: input.workshop_title,
            description: input.description,
            timezone: input.timezone,
            trainer: input.trainer,
            start_and_end_time: input.start_and_end_time,
            start_date: input.start_date,
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

  update: publicProcedure
    .input(createInsertSchema(tbl_workshops))
    .mutation(async ({ ctx, input }) => {
      try {
        const isClass = await db.query.tbl_workshops.findFirst({
          where: eq(tbl_workshops.workshop_id, input.workshop_id!),
        });
        if (!isClass) {
          return {
            success: false,
            message: "class not found",
          };
        }
        const data = await db
          .update(tbl_workshops)
          .set({
            workshop_title: input.workshop_title,
            description: input.description,
            timezone: input.timezone,
            trainer: input.trainer,
            start_and_end_time: input.start_and_end_time,
            start_date: input.start_date,
            thumbnail: input.thumbnail,
          })
          .where(eq(tbl_workshops.workshop_id, input.workshop_id!))
          .returning();
        return {
          success: true,
          message: "Successfully updated workshop",
          data: data[0],
        };
      } catch (error: any) {
        console.log(error.message);
        return {
          success: false,
          message: "Error to fetch API",
        };
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const isClass = await db.query.tbl_workshops.findFirst({
          where: eq(tbl_workshops.workshop_id, input.id),
        });
        if (!isClass) {
          return {
            success: false,
            message: "class not found",
          };
        }
        const insertData = await db
          .delete(tbl_workshops)
          .where(eq(tbl_workshops.workshop_id, input.id))
          .returning();
        return {
          success: true,
          message: "Successfully deleted workshop",
          data: insertData[0],
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
    .input(z.object({ limit: z.number(), page: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const classData = await db.query.tbl_workshops.findMany({
          // orderBy: desc(tbl_classes.id),
          // limit: input.limit,
          // offset: input.page * input.limit
        });
        return {
          success: true,
          message: "Successfully fetched workshop",
          data: classData,
        };
      } catch (error: any) {
        console.log(error.message);
        return {
          success: false,
          message: `Error to fetch API
        ${process.env.NODE_ENV !== "production" ? `${error.message}` : ""} `,
        };
      }
    }),
});
