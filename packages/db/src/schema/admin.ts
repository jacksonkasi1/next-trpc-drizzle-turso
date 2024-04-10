import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tbl_admin = sqliteTable("tbl_admin", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  user_id: text("user_id").notNull().unique(), // the clerk User Id
  first_name: text("first_name").default(""),
  last_name: text("last_name").default(""),
  email: text("email").default(""),
  photo_url: text("photo_url").default(""),
  attributes: text("attributes", { mode: "json" }),
  // .$default(() => { }),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$default(() => new Date())
});

// ** __________ RELATIONS __________ **
