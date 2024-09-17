"use server";

import { createSession } from "@/lib/session";
import { LoginInfo, AuthServerActionResponse } from "@/types";

type LoginServerActionResponse = AuthServerActionResponse & {
  user: {
    username: string;
    id: string;
    email: string;
  };
};

export async function loginAction(
  formData: LoginInfo,
): Promise<LoginServerActionResponse> {
  const res = await fetch(process.env.BASE_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const resJson = await res.json();

  await createSession({ id: resJson.user.id });

  return resJson;
}
