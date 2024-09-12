import { z } from "zod";

type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      result?: {
        success?: boolean;
        message?: string;
      };
    }
  | undefined;

const LoginSchema = z.object({
  email: z.string().min(1).email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function login(_: LoginFormState, formData: FormData) {
  let payload: { [key: string]: string } = {};
  formData.forEach((v, k) => {
    payload[k.toString()] = v.toString();
  });

  const validateFields = LoginSchema.safeParse(payload);

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }

  const result = await fetch("/api/auth/login", {
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
      message: "Login success!",
    },
  };
}
