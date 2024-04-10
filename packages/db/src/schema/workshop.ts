import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

/* import schema */
import { tbl_workshop_entries } from "./workshop_entries";

export const tbl_workshops = sqliteTable("tbl_workshops", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  workshop_id: text("workshop_id")
    .notNull()
    .unique()
    .$default(() => nanoid().toString()),
  workshop_title: text("workshop_title").notNull(),
  description: text("description").notNull(),
  start_date: integer("start_date", { mode: "timestamp" }),
  start_and_end_time: text("start_and_end_time"),
  timezone: text("timezone").notNull(),
  trainer: text("trainer").notNull(),
  thumbnail: text("thumbnail"),

  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

// ** __________ RELATIONS __________ **

export const workshopRelation = relations(tbl_workshops, ({ many }) => ({
  entries: many(tbl_workshop_entries),
}));
