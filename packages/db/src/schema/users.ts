import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/* import schema */
import { tbl_class_entries } from "./class_entries";
import { tbl_workshop_entries } from "./workshop_entries";

export const tbl_users = sqliteTable("tbl_users", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  user_id: text("user_id").notNull().unique(), // the clerk User Id

  first_name: text("first_name").default(""),
  last_name: text("last_name").default(""),
  email: text("email").default(""),

  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

// ** __________ RELATIONS __________ **

// Defining Relations
export const userRelations = relations(tbl_users, ({ many }) => ({
  class: many(tbl_class_entries),
  workshop: many(tbl_workshop_entries),
}));
