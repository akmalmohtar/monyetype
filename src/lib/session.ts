import "server-only";
import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

const tokenExp = {
  access: new Date(Date.now() + 3_600_000), // 1 hour
  refresh: new Date(Date.now() + 1_209_600_000), // 2 weeks
};

export async function encrypt(payload: JWTPayload, expiry: Date) {
  try {
    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiry)
      .sign(key);
    return token;
  } catch (error) {
    console.log("Error signing token", error);
    return null;
  }
}

export async function decrypt(token: string) {
  try {
    const user = await jwtVerify(token, key);
    return user;
  } catch (error) {
    console.log("Error verifying token", error);
    return null;
  }
}

export async function createSession(data: unknown) {
  const session = await encrypt({ data }, tokenExp.access);

  if (!session) {
    const message = "Fail to create session.";
    console.log(message);
    throw new Error(message);
  }

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: tokenExp.access,
  });
}

export async function deleteSession() {
  cookies().delete("session");
}
