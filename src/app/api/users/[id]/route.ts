import { apiGet } from "../../database";

export async function GET(req: Request) {
  const query = `
    SELECT * FROM users
  `;

  let status, resBody;
  try {
    await apiGet(query)
      .then((res) => {
        status = 200;
        resBody = res;
      })
      .catch((err) => {
        status = 400;
        resBody = { error: err };
      });

    return Response.json(resBody, { status });
  } catch (error: unknown) {
    console.error(error);

    return Response.json({
      error,
      status: 400,
    });
  }
}
