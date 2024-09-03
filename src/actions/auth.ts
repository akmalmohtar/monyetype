import { z } from "zod";

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
    return { password: ["Passwords do not match!"] };
  }

  const validateFields = SignupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
}
