import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/* import schema */
import { tbl_class_entries } from "./class_entries";

export const tbl_classes = sqliteTable("tbl_classes", {
    id: integer("id").notNull().primaryKey({ autoIncrement: true }),
    class_id: text("class_id").notNull().unique(),
    // .$default(() => crypto.randomUUID().toString()),
    class_name: text("class_name").notNull(),
    description: text("description").notNull(),
    list: text("list", { mode: "json" }),
    offer_price: integer("offer_price"),
    regular_price: integer("regular_price"),
    mode: text("mode", { enum: ["Online", "Offline"] }),
    plan: text("plan", { mode: "json" }),
    // .$default(() => []),
    days: text("days", { mode: "json" }),
    // .$default(() => []),
    timings: text("timings", { mode: "json" }),
    // .$default(() => { }),
    eligibility: text("eligibility").notNull(),
    thumbnail: text("thumbnail"),

    createdAt: integer("created_at", { mode: "timestamp" }).default(
        sql`(strftime('%s', 'now'))`
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" }).default(
        sql`(strftime('%s', 'now'))`
    ),
});

// ** __________ RELATIONS __________ **

export const classRelation = relations(tbl_classes, ({ many }) => ({
    entries: many(tbl_class_entries),
}));
