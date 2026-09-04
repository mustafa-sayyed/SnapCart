import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { productVariants } from "./products.schema.js";

export const carts = pgTable(
  "carts",
  {
    id: t.serial("id").primaryKey(),
    userId: t
      .integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
    totalAmount: t.numeric("total_amount", { mode: "number" }).notNull().default(0),
  },
  (table) => [t.unique("unique_user_cart").on(table.userId)],
);

export const cartItems = pgTable(
  "cart_items",
  {
    id: t.serial("id").primaryKey(),
    cartId: t
      .integer("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" }),
    productVariantId: t
      .integer("product_variant_id")
      .notNull()
      .references(() => productVariants.id, { onDelete: "cascade" }),
    quantity: t.integer("quantity").notNull().default(1),
    createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
  },
  (table) => [
    t.unique("unique_cart_product").on(table.cartId, table.productVariantId),
  ],
);
