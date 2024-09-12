import { sign, verify } from "jsonwebtoken";

const secretKey = process.env.SESSION_SECRET;

export async function encrypt(email: string) {
  try {
    const accessToken = sign(email, process.env.SESSION_SECRET!);
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
