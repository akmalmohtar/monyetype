import { db } from "@/db/database";
import { users } from "@/db/schema/user-schema";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const result = await db.insert(users).values({ username, email, password });

  return Response.json(result);
}

export async function GET(req: Request) {
  const result = await db.select().from(users);

  return Response.json(result);
}
