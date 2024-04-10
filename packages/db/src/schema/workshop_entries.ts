import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/* import schema */
import { tbl_users } from "./users";
import { tbl_workshops } from "./workshop";

export const tbl_workshop_entries = sqliteTable("tbl_workshop_entries", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  entries_id: text("entries_id")
    .unique()
    .$default(() => crypto.randomUUID().toString()),
  user_id: text("user_id")
    .notNull()
    .references(() => tbl_users.user_id, { onDelete: "set null" }),
  workshop_id: text("workshop_id")
    .notNull()
    .references(() => tbl_workshops.workshop_id, { onDelete: "set null" }),

  amount: integer("amount"),
  currency: text("currency").default("INR"),
  invoice_url: text("invoice_url"),
  transaction_type: text("transaction_type").default(""),
  payment_method: text("payment_method").default(""),
  payu_meta: text("payu_meta", { mode: "json" }).$default(() => {}),

  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

// ** __________ RELATIONS __________ **

export const tblWorkshopEntriesRelation = relations(
  tbl_workshop_entries,
  ({ one }) => ({
    workshop: one(tbl_workshops, {
      fields: [tbl_workshop_entries.workshop_id],
      references: [tbl_workshops.workshop_id],
    }),
    users: one(tbl_users, {
      fields: [tbl_workshop_entries.user_id],
      references: [tbl_users.user_id],
    }),
  })
);
