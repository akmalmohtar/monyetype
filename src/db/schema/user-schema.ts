import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  username: text("username"),
  email: text("email").unique(),
  password: text("password"),
});

export type TUser = typeof users.$inferSelect;
export type TNewUser = typeof users.$inferInsert;
