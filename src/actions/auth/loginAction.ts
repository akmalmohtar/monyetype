"use server";

import { createSession } from "@/lib/session";
import { LoginInfo, AuthServerActionResponse } from "@/types";

export async function loginAction(
  formData: LoginInfo,
): Promise<AuthServerActionResponse> {
  const res = await fetch(process.env.BASE_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const resJson = await res.json();

  await createSession(formData.email);

  return resJson;
}
