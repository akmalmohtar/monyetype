import { migrate } from "../migration";

export async function GET() {
  migrate();

  return Response.json({ message: "database initiated" });
}
