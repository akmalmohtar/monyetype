import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite", // "postgresql" | "mysql"
  schema: "./src/db/schema/",
  dbCredentials: {
    url: "sqlite.db",
  },
});
