import { db } from "@/db/database";
import { users } from "@/db/schema/user-schema";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const rows = await db
    .select({ hashedPassword: users.password })
    .from(users)
    .where(eq(email, users.email));

  if (!rows.length) {
    return Response.json({ message: "Email not found" }, { status: 404 });
  }

  const { hashedPassword } = rows[0];

  const result = await bcrypt.compare(password, hashedPassword!);

  if (!result) {
    return Response.json({ message: "Wrong password" }, { status: 403 });
  }

  await createSession(email);

  return Response.json(result, { status: 200 });
}
