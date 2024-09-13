import { z } from "zod";
import type { CheckedState } from "@radix-ui/react-checkbox";

export type TDifficulty = "easy" | "medium" | "hard";

export type TRhythmSettings = {
  gameDuration: number;
  letterDuration: number;
  enableNextLetter: CheckedState;
  enableNumbers: CheckedState;
  enableSpecialCharacters: CheckedState;
  enableUppercaseLetters: CheckedState;
  enableUppercaseSpecialCharacters: CheckedState;
};

export type SignupInfo = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInfo = {
  email: string;
  password: string;
};

export const SignupSchema = z
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

export const LoginSchema = z.object({
  email: z.string().min(1).email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
