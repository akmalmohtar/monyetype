import { deleteSession } from "@/lib/session";
export async function POST() {
  await deleteSession();

  return Response.json({ message: "Logout success" });
}
