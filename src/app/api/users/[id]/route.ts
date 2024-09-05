import { db } from "@/db/database";
import { users } from "@/db/schema/user-schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const result = await db.select().from(users).where(eq(users.id, +id));

  return Response.json(result);
}
