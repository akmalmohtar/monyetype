import { db } from "@/db/database";
import { users } from "@/db/schema/user-schema";
import { z } from "zod";
import bcrypt from "bcryptjs";

const SignupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long "),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long "),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match!",
    path: ["password", "confirmPassword"],
  });

export async function POST(req: Request) {
  const { username, email, password, confirmPassword } = await req.json();

  const validateFields = SignupSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  });
  if (!validateFields.success) {
    return Response.json(
      { success: false, message: "Invalid data" },
      { status: 403 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 15);

  try {
    await db
      .insert(users)
      .values({ username, email, password: hashedPassword });

    return Response.json(
      { success: true, message: "Signup success" },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Email already exists" },
      { status: 409 },
    );
  }
}
