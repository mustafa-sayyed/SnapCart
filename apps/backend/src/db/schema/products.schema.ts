import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: t.serial("id").primaryKey(),
  name: t.varchar("name").notNull(),
});

export const products = pgTable("products", {
  id: t.serial("id").primaryKey(),
  name: t.varchar("name").notNull(),
  description: t.text("description"),
  categoryId: t
    .integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "set null" }),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
});

export const productVariants = pgTable("product_variants", {
  id: t.serial("id").primaryKey(),
  productId: t
    .integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  attributes: t.jsonb("attributes"),
  price: t.numeric("price", { mode: "number" }).notNull(),
  stock: t.integer("stock").notNull().default(0),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
});
