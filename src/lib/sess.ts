import "server-only";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

async function encrypt(email: string) {
  try {
    const accessToken = sign(email, process.env.SESSION_SECRET!);
    return accessToken;
  } catch (error) {
    console.log("Error signing user", error);
    return null;
  }
}

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
