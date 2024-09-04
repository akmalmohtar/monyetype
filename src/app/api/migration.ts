import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
    db.run(
      `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL
        );
      `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Users table created successfully.");
      },
    );
  });
};
