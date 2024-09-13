export async function signup(formData: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  console.log("res", res);
  return await res.json();
}
