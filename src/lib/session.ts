import "server-only";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;

export async function encrypt(email: string) {
  try {
    const accessToken = sign(email, secretKey!);
    return accessToken;
  } catch (error) {
    console.log("Error signing user", error);
    return null;
  }
}

export async function decrypt(token: string) {
  try {
    const user = verify(token, secretKey!);
    return user;
  } catch (error) {
    console.log("Error verifying token", error);
    return null;
  }
}

export async function createSession(email: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 24 * 60 * 60 * 1000);

  const session = await encrypt(email);

  if (!session) {
    console.log("No session found.");
    return;
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
