import { z } from "zod";

type FormState =
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

export async function login(state: FormState, formData: FormData) {
  const validateFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
}
