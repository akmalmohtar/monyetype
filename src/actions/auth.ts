import { z } from "zod";
const bcrypt = require("bcryptjs");

type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

const LoginSchema = z.object({
  email: z.string().min(1).email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function login(state: LoginFormState, formData: FormData) {
  const validateFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
}

type SignupFormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

const SignupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long "),
});

export async function signup(state: SignupFormState, formData: FormData) {
  if (formData.get("password") !== formData.get("confirmPassword")) {
    return { errors: { password: ["Passwords do not match!"] } };
  }

  let payload = {
    username: formData.get("username")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };

  const validateFields = SignupSchema.safeParse(payload);

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  payload = { ...payload, password: hashedPassword };

  try {
    await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { message: "Signup success!" };
  } catch (error) {
    return { message: "Signup failed!" };
  }
}
