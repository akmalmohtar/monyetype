import { apiPost } from "../database";

export async function POST(req: Request, res: Response) {
  const { username, email, password } = await req.json();

  const query = `
    INSERT INTO users(username, email, password)
    VALUES(?, ?, ?);
  `;

  const values = [username, email, password];

  let status, resBody;
  await apiPost(query, values)
    .then(() => {
      status = 200;
      resBody = { message: "User has been added." };
    })
    .catch((err) => {
      status = 400;
      resBody = err;
    });

  return Response.json(resBody, { status });
}
