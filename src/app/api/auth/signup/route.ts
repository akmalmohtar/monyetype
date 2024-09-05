import { db } from "@/db/database";
import { users } from "@/db/schema/user-schema";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 15);

  try {
    const result = await db
      .insert(users)
      .values({ username, email, password: hashedPassword });

    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Email already exists." }, { status: 409 });
  }
}
