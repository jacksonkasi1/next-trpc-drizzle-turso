import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ** import schema
import { tbl_classes } from "./class_model";
import { tbl_users } from "./users";

export const tbl_class_entries = sqliteTable("tbl_class_entries", {
    id: integer("id").notNull().primaryKey({ autoIncrement: true }),
    entries_id: text("entries_id").unique(),
    user_id: text("user_id")
        .notNull()
        .references(() => tbl_users.user_id, { onDelete: "set null" }),
    class_id: text("class_id")
        .notNull()
        .references(() => tbl_classes.class_id, { onDelete: "set null" }),

    mode: text("mode", { enum: ["Online", "Offline"] }),
    plan: text("plan").notNull(),
    days: text("days").notNull(),
    timings: text("timings").notNull(),
    amount: integer("amount"),
    currency: text("currency").default("INR"),
    invoice_url: text("invoice_url"),
    transaction_type: text("transaction_type").default(""),
    payment_method: text("payment_method").default(""),
    payu_meta: text("payu_meta", { mode: "json" }),

    createdAt: integer("created_at", { mode: "timestamp" }).default(
        sql`(strftime('%s', 'now'))`
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" }).default(
        sql`(strftime('%s', 'now'))`
    ),
});

// ** __________ RELATIONS __________ **

export const tblClassEntriesRelation = relations(tbl_class_entries, ({ one }) => ({
    class: one(tbl_classes, {
        fields: [tbl_class_entries.class_id],
        references: [tbl_classes.class_id],
    }),
    users: one(tbl_users, {
        fields: [tbl_class_entries.user_id],
        references: [tbl_users.user_id],
    }),
}));
