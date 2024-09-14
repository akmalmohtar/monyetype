"use server";

import { LoginInfo, ServerActionResponse } from "@/types";

export async function loginAction(
  formData: LoginInfo,
): Promise<ServerActionResponse> {
  const res = await fetch(process.env.BASE_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return await res.json();
}
