import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: t.serial("id").primaryKey(),
  name: t.varchar("name").notNull(),
  email: t.varchar("email").unique().notNull(),
  password: t.varchar("password").notNull(),
  phoneNumber: t.numeric("phone_number", { mode: "number" }),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow(),
});

export const addresses = pgTable("addresses", {
  id: t.serial("id").primaryKey(),
  userId: t
    .integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  addressLine1: t.varchar("address_line_1").notNull(),
  addressLine2: t.varchar("address_line_2"),
  city: t.varchar("city").notNull(),
  state: t.varchar("state").notNull(),
  country: t.varchar("country").notNull(),
  pinCode: t.numeric("pin_code", { mode: "number" }).notNull(),
  isDefault: t.boolean("is_default").default(false),
});
