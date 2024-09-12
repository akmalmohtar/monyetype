import { z } from "zod";

type SignupFormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      result?: {
        success?: boolean;
        message?: string;
      };
    }
  | undefined;

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

export async function signup(_: SignupFormState, formData: FormData) {
  // Convert the form data into object
  let payload: { [key: string]: string } = {};
  formData.forEach((v, k) => {
    payload[k.toString()] = v.toString();
  });

  const validateFields = SignupSchema.safeParse(payload);
  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }

  const result = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    const { message } = await result.json();
    return {
      result: {
        success: false,
        message,
      },
    };
  }

  return {
    result: {
      success: true,
      message: "Signup success!",
    },
  };
}
