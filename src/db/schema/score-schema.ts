import { integer, pgTable, serial, timestamp, real } from "drizzle-orm/pg-core";
import { users } from "./user-schema";

export const rhythmScores = pgTable("rhythm_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  timestamp: timestamp("timestamp").notNull(),
  score: real("score").notNull(),
});

export type TRhythmScore = typeof rhythmScores.$inferSelect;
export type TNewRhythmScore = typeof rhythmScores.$inferInsert;
