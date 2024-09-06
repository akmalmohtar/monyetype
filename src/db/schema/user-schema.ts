import { text, serial, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username"),
  email: text("email").unique(),
  password: text("password"),
});

export type TUser = typeof users.$inferSelect;
export type TNewUser = typeof users.$inferInsert;
