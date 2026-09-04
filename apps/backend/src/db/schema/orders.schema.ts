import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { addresses, users } from "./users.schema.js";
import { productVariants } from "./products.schema.js";

export const orderStatusEnum = t.pgEnum("order_status", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

const orders = pgTable("orders", {
  id: t.serial("id").primaryKey(),
  userId: t
    .integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "set null" }),
  totalAmount: t.numeric("total_amount", { mode: "number" }).notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),
  shippingAddress: t
    .integer("shipping_address")
    .notNull()
    .references(() => addresses.id, { onDelete: "set null" }),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: t.serial("id").primaryKey(),
  orderId: t
    .integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productVariantId: t
    .integer("product_variant_id")
    .notNull()
    .references(() => productVariants.id, { onDelete: "set null" }),
  quantity: t.integer("quantity").notNull().default(1),
  priceAtPurchase: t.numeric("price_at_purchase", { mode: "number" }).notNull(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
});
