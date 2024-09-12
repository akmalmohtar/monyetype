import "server-only";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "./crypt";

export async function createSession(email: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 24 * 60 * 60 * 1000);

  const session = await encrypt(email);

  if (!session) {
    const message = "Fail to create session.";
    console.log(message);
    throw new Error("message");
  }

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function refreshSession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return null;
  }

  const payload = await decrypt(session);
  if (!payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  cookies().delete("session");
}
