// app/api/check-auth/route.ts
import { cookies } from "next/headers";
import { decrypt } from "@/lib/crypt";

export async function GET() {
  const session = cookies().get("session")?.value;
  const isAuthenticated = session ? await decrypt(session) : false;

  return Response.json({ isAuthenticated });
}
