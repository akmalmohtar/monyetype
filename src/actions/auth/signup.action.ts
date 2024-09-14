"use server";

import { ServerActionResponse, SignupInfo } from "@/types";

export async function signupAction(
  formData: SignupInfo,
): Promise<ServerActionResponse> {
  const res = await fetch(process.env.BASE_URL + "/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return await res.json();
}
