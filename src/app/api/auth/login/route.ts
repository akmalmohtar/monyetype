import { db } from "@/db/database";
import { users } from "@/db/schema/user-schema";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().min(1).email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const validateFields = LoginSchema.safeParse({ email, password });

  if (!validateFields.success) {
    return Response.json(
      { success: false, message: "Invalid data" },
      { status: 403 },
    );
  }

  const rows = await db
    .select({ hashedPassword: users.password })
    .from(users)
    .where(eq(email, users.email));

  if (!rows.length) {
    return Response.json(
      { success: false, message: "Email not found" },
      { status: 404 },
    );
  }

  const { hashedPassword } = rows[0];

  const result = await bcrypt.compare(password, hashedPassword!);

  if (!result) {
    return Response.json(
      { success: false, message: "Wrong password" },
      { status: 403 },
    );
  }

  await createSession(email);

  return Response.json(
    { success: true, message: "Login success" },
    { status: 200 },
  );
}
